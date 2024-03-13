<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceSummaryResource;
use App\Models\FAQ;
use App\Models\gallery;
use App\Models\package;
use App\Models\Price;
use App\Models\Requirements;
use App\Models\OptionUser;
use App\Models\Standard;
use App\Models\User;
use App\Services\ServicesService;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class SellerServiceController extends Controller
{
    protected $service;
    public function __construct(ServicesService $service)
    {
        $this->service = $service;
    }

    public function createOverView(Request $request, $optionId)
    {
        $user = User::find(Auth::user()->id);

        // return $request->all();

        $user->options()->attach($optionId, [
            'service_id' => $request->serviceId,
            'subcategory_id' => $request->subcategoryId,
            'category_id' => $request->categoryId,
            'title' => $request->title,
            'keywords' => $request->search,
            'active' => false
        ]);


        $service = OptionUser::select('id')->where('user_id', Auth::user()->id)->where('option_id', intval($request->optionId))->first();

        return response()->json([
            'id' => $service->id,
            'message' => 'successflully created'
        ]);
    }
    public function updateOverview(Request $request, $optionId)
    {

        $service = OptionUser::find($optionId);


        $service->option_id = $request->optionId;
        $service->service_id = $request->serviceId;

        $service->subcategory_id = $request->subcategoryId;
        $service->category_id = $request->categoryId;
        $service->title = $request->title;
        $service->search = $request->search;

        $service->save();


        return response()->json([
            'message' => 'successflully updated'
        ]);
    }
    public function createPrice(Request $request, $optionId)
    {


        foreach ($request->all() as $package) {

            $data =  package::create([
                'option_id' => $optionId,
                'name' => $package['name'],
                'description' => $package['description'],
                'price' => $package['price'],
                'package' => $package['package'],
            ]);

            foreach ($package['standards'] as $standard) {

                $data->standards()->attach($standard['standard_id'], ['value_id' => $standard['value_id']]);
            }
        }

        return response()->json("successful");

        $data = OptionUser::with(['packages.standards.values'])->find($optionId);


        foreach ($data->packages as $package) {
            foreach ($package->standards as $key => $standard) {
                # code...
                $valueId = $standard->pivot->value_id;
                if (isset($valueId)) {
                    $value = $standard->values->where('id', $valueId)->first();
                    unset($standard->values);
                    $standard->values = $value;
                } else {
                    unset($standard->values);
                }
                // if (isset($valueId) || !empty($standard->values) && is_array($standard->values->toArray())) {
                //     // Filter the values array based on value_id from pivot
                //     $filteredValues = Arr::where($standard->values->toArray(), function ($value) use ($valueId) {
                //         return $value['id'] == $valueId;
                //     });
                //     if (!empty($filteredValues)) {
                //         unset($standard->values);
                //         $standard->values=$filteredValues;
                //     }
                // }
                // else {
                //     unset($standard->values);
                //     $standard->values=null;
                // }
            }
        }

        return $data;
    }

    public function updatePrice(Request $request, $optionId)
    {

        foreach ($request->all() as $package) {
            $value = package::find($package['id']);


            $value->option_id = $optionId;
            $value->name = $package['name'];
            $value->description = $package['description'];
            $value->price = $package['price'];
            $value->package = $package['package'];

            $value->save();
            $collection = collect($package['standards'])->keyBy('standard_id');


            $value->standards()->sync($collection);
        }
        return response()->json("successful");
    }

    public function createGallery(Request $request, $serviceId)
    {
        $path = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();

            $name = time() . '_' . uniqid() . '.' . $extension;

            $file->move('service', $name);
            $path = 'service/' . $name;
        }
        OptionUser::where('id', $request->serviceId)->update(['image' => $path]);
        $imageNames = [];
        if (isset($request->images)) {

            foreach ($request->images as $file) {

                if (isset($file) && $file instanceof UploadedFile) {

                    $extension = $file->getClientOriginalExtension();

                    $name = time() . '_' . uniqid() . '.' . $extension;

                    $file->move('service', $name);
                    $path = 'service/' . $name;

                    $imageNames[] = $path;
                }
            }
        }


        if (isset($imageNames)) {
            foreach ($imageNames as $image) {
                gallery::create([
                    'service_id' => $serviceId,
                    'image' => $image
                ]);
            }
        }

        return response()->json([
            'message' => 'Successfully Created'
        ]);
    }




    public function updateGallery(Request $request, $serviceId)
    {


        if (is_array($request->gallery) && !empty($request->gallery)) {
            $gallery = gallery::where('service_id', $serviceId)->get();


            foreach ($gallery as $destination) {
                foreach ($request->gallery as $image) {
                    if (strcmp($destination->image, $image) === 0 && File::exists($destination->image)) {

                        File::delete($destination->image);
                        gallery::find($destination->id)->delete();
                    }
                }
            }
        }


        $imageNames = [];
        if (isset($request->images)) {

            foreach ($request->images as $file) {

                if (isset($file) && $file instanceof UploadedFile) {

                    $extension = $file->getClientOriginalExtension();

                    $name = time() . '_' . uniqid() . '.' . $extension;

                    $file->move('service', $name);
                    $path = 'service/' . $name;

                    $imageNames[] = $path;
                }
            }
        }


        if (isset($imageNames)) {
            foreach ($imageNames as $image) {
                gallery::create([
                    'service_id' => $serviceId,
                    'image' => $image
                ]);
            }
        }

        return response()->json([
            'message' => 'Successfully Updated'
        ]);
    }



    public function createFaq(Request $request, $serviceId)
    {
        OptionUser::where('id', $serviceId)->update(['description' => $request->description]);
        foreach ($request->faqs as  $items) {
            FAQ::create([
                'service_id' => $serviceId,
                'question' => $items['question'],
                'answer' => $items['answer'],
            ]);
        }

        return response()->json([
            'message' => 'successfully inserted'
        ], 200);
    }

    public function updateFaq(Request $request, $serviceId)
    {
        OptionUser::where('id', $serviceId)->update(['description' => $request->description]);
        FAQ::where('service_id', $serviceId)->delete();
        foreach ($request->faqs as  $items) {

            FAQ::create([
                'service_id' => $serviceId,
                'question' => $items['question'],
                'answer' => $items['answer'],
            ]);
        }

        return response()->json([
            'message' => 'successfully inserted'
        ], 200);
    }

    public function createRequirement(Request $request, $serviceId)
    {
        Requirements::create([
            'service_id' => $serviceId,
            'term' => $request->terms,
            'note' => $request->note,



        ]);
        return response()->json([
            'message' => 'Successfully Created'
        ]);
    }

    public function updateRequirement(Request $request, $serviceId)
    {
        $requirement = Requirements::where('service_id', $serviceId)->first();

        $requirement->service_id = $serviceId;
        $requirement->term = $request->terms;
        $requirement->note = $request->note;

        $requirement->save();



        return response()->json([
            'message' => 'Successfully Created'
        ]);
    }


    public function saveService($serviceId)
    {


        OptionUser::find($serviceId)->update(['active' => 1]);
        return response()->json('successfully saved');
    }
    public function viewSellerProfile()
    {
        $data = User::with(['profile', 'profession', 'availability'])
            ->latest()
            ->find(Auth::user()->id);

        return response()->json($data, 200);
    }

    public function DraftService($serviceId)
    {
        $data = OptionUser::with(['category:id,name', 'subcategory:id,name', 'service:id,name', 'option:id,name', 'packages.standards', 'faqs', 'galleries', 'requirements'])
            ->find($serviceId);

        return response()->json($data, 200);
    }



    public function viewServiceCards()
    {
        $data = OptionUser::whereHas('user', function ($query) {
            $query->where('id', Auth::user()->id);
        })
            ->select('id', 'title', 'option_id','active')
            ->with(['galleries' => function ($query) {
                $query->first();
            }])
            ->get();

        return response()->json($data, 200);
    }


    public function getServiceDetails($serviceId)
    {

        $data = OptionUser::with([ 'user.profile','category:id,name', 'subcategory:id,name', 'service:id,name', 'option:id,name', 'packages.standards', 'faqs', 'galleries', 'requirements'])
            ->find($serviceId);

        return response()->json($data, 200);
    }

    public function viewServiceSummary()
    {
        $data = OptionUser::where('user_id', Auth::user()->id)
            ->select('id', 'option_id', 'active')
            ->with(['option:id,name'])
            ->withCount('orders')
            ->get();
        if ($data) {
            return ServiceSummaryResource::collection($data);
        }
    }


    public function getOptionStandards($id)
    {

        // $service = Option::table('standard_values')->where('standard_id', $id)->latest()->get();

        $standard = Standard::where('option_id', $id)->with('values')
            ->get();
        return $standard;
        // ->join('orders', 'users.id', '=', 'orders.user_id')
        // ->select('users.*', 'contacts.phone', 'orders.price')
        // if ($service) {
        //   return CatServiceResource::collection($service);
        // }
    }

    public function deleteService($id)
    {
        OptionUser::find($id)->delete();
        return response()->json('successfully deleted');
    }
}
