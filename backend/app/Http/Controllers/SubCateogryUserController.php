<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class SubCateogryUserController extends Controller
{
    public function joinSubCategory(Request $request, $providerId, $subcategoryId)
    {
        // return response()->json(
        //     json_decode($request->available_cities)
        // );
        $imageNames = [];
        if (isset($request->certificates)) {

            foreach ($request->certificates as $file) {

                if (isset($file) && $file instanceof UploadedFile) {

                    $extension = $file->getClientOriginalExtension();

                    $name = time() . '_' . uniqid() . '.' . $extension;

                    $file->move('certificate', $name);
                    $path = 'certificate/' . $name;

                    $imageNames[] = $path;
                }
            }
        }

        if (isset($imageNames)) {
            foreach ($imageNames as $image) {
                $data = new Certificate();
                $data->category_id = $subcategoryId;
                $data->name = $image;
                $data->user_id = $providerId;
                $data->save();
            }
        }
        $user = User::find($providerId);
        // $collection['available_cities']=json_encode($request->available_cities);

        $user->subcategory()->attach($subcategoryId, [
            'profession' => $request->profession,
            'description' => $request->description,
            'available_time' => json_decode($request->available_time),
            'available_days' => json_decode($request->available_days),
            'available_date' => $request->available_date,
            'available_cities' => json_decode($request->available_cities),
            'special_availability' => $request->special_availability,
            'payment_method' => $request->payment_method,
            'payment_structure' => $request->payment_structure,
            'payment_instructions' => $request->payment_instructions,
            'currency_symbol' => $request->currency_symbol,
            'delivery_method' => $request->delivery_method,
            'delivery_charge' => $request->delivery_charge,
            'education' => $request->education,
            'experience' => $request->experience,
            'training' => $request->training,
            'project' => $request->project,
            'limitation' => $request->limitation,
            'terms' => $request->terms,
            'measures' => $request->measures,




        ]);
        return response()->json([
            'message' => 'successfully added'
        ]);
    }

    public function getSubCategory($providerId, $subcategoryId)
    {
        $subcategory = User::whereHas('subcategory', function ($query) use ($subcategoryId) {
            $query->where('id', $subcategoryId);
        })->with('subcategory')->find($providerId);
        if ($subcategory) {

            return response()->json($subcategory);
        }
        return false;
    }
}
