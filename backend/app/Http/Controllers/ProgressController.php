<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderScopeResource;
use App\Http\Resources\ProgressResource;
use App\Http\Resources\ScopeProgressResource;
use App\Http\Resources\ScopeResource;
use App\Http\Resources\SelectedTaskResource;
use App\Models\Material;
use App\Models\Order;
use App\Models\Progress;
use App\Models\Scope;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProgressController extends Controller
{
    public function workStatus(Request $request, $orderId)
    {

        $path = null;

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('progress', $name);
            $path = 'progress/' . $name;
        }
        $qrcode = null;
        if ($request->hasFile('qrcode')) {
            $file = $request->file('qrcode');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('qrcode', $name);
            $qrcode = 'qrcode/' . $name;
        }

        $progress = Progress::create([
            'order_id' => $orderId,
            'current_status' => $request->current_status,
            'expected_completion' => $request->expected_completion,
            'upcoming_works' => json_decode($request->upcoming_works),
            'delivery_charge' => $request->delivery_charge,
            'emergency_charge' => $request->emergency_charge,


            'discount' => $request->discount,
            'additional_charge' => $request->additional_charge,
            'total_cost' => $request->total_cost,

            'payment_due_date' => $request->payment_due_date,

            'payment_method' => json_decode($request->payment_method),
            'qrcode' => $qrcode,
            'esewa' => $request->esewa,
            'service_delay' => $request->service_delay,
            'delay_reason' => $request->delay_reason,
            'image' => $path,
            'additional_notes' => $request->additional_notes,
            'issue_challenge' => $request->issue_challenge,

        ]);

        $completed_works = json_decode($request->completed_works);

        $collection = collect($completed_works)->keyBy('id')
            ->map(function ($item) {
                return collect($item)->except('id')->toArray();
            });
        $progress->works()->syncWithoutDetaching($collection);

        $materials = json_decode($request->materials);
        foreach ($materials as $item) {
            Material::create([
                'progress_id' => $progress->id,
                'name' => $item->name,
                'cost' => $item->cost
            ]);
        }
        return response()->json([
            'message' => 'successfully created'
        ]);
    }

    public function getCustomerTask($orderId)
    {
        $order = Order::with('scopes')->find($orderId);
        $scopeId = $order->scopes->pluck('id');
        $scopes = DB::table('scope_user')->where('user_id', $order->provider_id)->whereIn('scope_id', $scopeId)->get();


        return response([
            'order_works' => OrderScopeResource::collection($order->scopes),
            'scopes' => ScopeProgressResource::collection($scopes)

        ]);

        return ScopeProgressResource::collection($scopes);
    }

    public function viewStatus($orderId)
    {

        $order = Order::find($orderId);


        $scopeId = $order->scopes->pluck('id');

        $scopes = DB::table('scope_user')->where('user_id', $order->provider_id)->whereIn('scope_id', $scopeId)->get();
        $progress = Progress::whereHas('orders', function ($query) use ($orderId) {
            $query->where('id', $orderId);
        })

            ->with('works', 'orders.scopes', 'materials')

            ->first();
        if ($progress) {
            return response()->json([
                'progress' => new ProgressResource($progress),
                'scopes' => ScopeProgressResource::collection($scopes)
            ]);
        }
        // return $progress;

        // $progress= Progress::where('order_id',$orderId)->first();

        if ($progress) {

            return new  ProgressResource($progress);
        }
        return false;
    }
    public function updateWorkStatus(Request $request, $progressId)
    {
        $progress = Progress::find($progressId);

        if ($request->hasFile('image')) {
            $destination = $progress->image;
            return $destination;
            if (File::exists($destination)) {
                File::delete($destination);
            }
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('progress', $name);
            $path = 'progress/' . $name;
        } else {
            $path = $progress->image;
        }
        $qrcode = null;
        if ($request->hasFile('qrcode')) {
            $destination = $progress->image;
            return $destination;
            if (File::exists($destination)) {
                File::delete($destination);
            }
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('qrcode', $name);
            $qrcode = 'qrcode/' . $name;
        } else {
            $qrcode = $progress->qrcode;
        }

        $collecton = [
            'order_id' => $request->order_id,
            'current_status' => $request->current_status,
            'expected_completion' => $request->expected_completion,
            'upcoming_works' => json_decode($request->upcoming_works),
            'delivery_charge' => $request->delivery_charge,
            'emergency_charge' => $request->emergency_charge,


            'discount' => $request->discount,
            'additional_charge' => $request->additional_charge,
            'total_cost' => $request->total_cost,

            'payment_due_date' => $request->payment_due_date,

            'payment_method' => json_decode($request->payment_method),
            'qrcode' => $qrcode,
            'esewa' => $request->esewa,
            'service_delay' => $request->service_delay,
            'delay_reason' => $request->delay_reason,
            'image' => $path,
            'additional_notes' => $request->additional_notes,
            'issue_challenge' => $request->issue_challenge,
        ];
        $progress->fill($collecton)->save();
       
        $completed_works = json_decode($request->completed_works);

        $collection = collect($completed_works)->keyBy('id')
            ->map(function ($item) {
                return collect($item)->except('id')->toArray();
            });
        $progress->works()->syncWithoutDetaching($collection);
        



        $materials = json_decode($request->materials);
        foreach ($materials as $item) {
            Material::updateOrCreate(
                [
                    'id' => $item->id ?? null
                ],
                [
                    'progress_id'=>$progressId,
                    'name' => $item->name,
                    'cost' => $item->cost,
                ]
            );
        }


        return response()->json([
            'message' => 'successfully created'
        ]);
    }
}
