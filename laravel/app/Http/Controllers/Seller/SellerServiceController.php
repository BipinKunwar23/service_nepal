<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceSummaryResource;
use App\Models\Description;
use App\Models\FAQ;
use App\Models\gallery;
use App\Models\OptionService;
use App\Models\package;
use App\Models\Price;
use App\Models\Requirements;
use App\Models\OptionUser;
use App\Models\ServiceUser;
use App\Models\Standard;
use App\Models\User;
use App\Notifications\Service;
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

    public function createServiceOverView(Request $request, $optionId)
    {

        $user = User::find(Auth::user()->id);

        // return $request->all();

        $user->options()->attach($optionId, [
            'service_id' => $request->serviceId,
            'title' => $request->title,
            'keywords' => $request->search,
            'status' => 'draft'
        ]);


        $service = OptionUser::select('id', 'service_id')->where('user_id', Auth::user()->id)->where('option_id', $optionId)->latest()->first();

        return response()->json([
            'id' => $service->id,
            'type' => $service->service->type,
            'message' => 'successflully created'
        ]);
    }
    public function updateServiceOverview(Request $request, $optionId)
    {

        $service = OptionUser::find($optionId);

        $service->option_id = $request->optionId;

        $service->service_id = $request->serviceId;

        $service->title = $request->title;
        $service->keywords = $request->search;

        $service->save();


        return response()->json([
            'message' => 'successflully updated'
        ]);
    }
    public function createPrice(Request $request, $serviceId)
    {


        foreach ($request->all() as $package) {

            $data =  package::create([
                'service_id' => $serviceId,
                'name' => $package['name'],
                'description' => $package['description'],
                'price' => $package['price'],
                'package' => $package['package'],
            ]);
            if ($package['package'] === "basic") {
                Description::create([
                    'service_id' => $serviceId,
                    'price' => $package['price'],
                ]);
            }

            foreach ($package['standards'] as $standard) {

                $data->standards()->attach($standard['standard_id'], ['value_id' => $standard['value_id']]);
            }
        }

        return response()->json("successful");

        $data = OptionUser::with(['packages.standards.values'])->find($serviceId);


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

    public function updatePrice(Request $request, $serviceId)
    {

        foreach ($request->all() as $package) {
            $value = package::find($package['id']);


            $value->service_id = $serviceId;
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
        Description::where('service_id', $serviceId)->first()->update(['image' => $path]);
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

        $detail = Description::where('service_id', $serviceId)->first();
        if ($request->hasFile('image')) {
            $destination = $detail->image;
            if (File::exists($destination)) {
                File::delete($destination);
            }
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('service', $name);
            $path = 'service/' . $name;
        } else {
            $path = $detail->image;
        }




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


        $service=OptionUser::find($serviceId);
        
        $service->status='pending';
        $service->save();
        $admin = User::where('role_id', 1)->first();

        $seller = $service->user;
        $seller = Auth::user();
        $data = [
            'user' => $seller->name,
            'photo' => $seller->profile->photo,
            'subject' => 'want to advertise service for ',
            'service' => $service->option->name
        ];
        $admin->notify(new Service($data));
        return response()->json('successfully saved');
    }

    public function createSpecificOverView(Request $request, $optionId)
    {
        $user = User::find(Auth::user()->id);

        // return $request->all();

        $user->options()->attach($optionId, [
            'service_id' => $request->serviceId,
            'title' => $request->title,
            'keywords' => $request->search,
            'status' => 'draft'
        ]);


        $service = OptionUser::select('id')->where('user_id', Auth::user()->id)->latest()->first();

        return response()->json([
            'id' => $service->id,
            'message' => 'successflully created'
        ]);
    }
    public function updateSpecificOverview(Request $request, $optionId)
    {

        $service = ServiceUser::find($optionId);


        $service->option_id = $optionId;

        $service->title = $request->title;
        $service->keywords = $request->keywords;

        $service->save();


        return response()->json([
            'message' => 'successflully updated'
        ]);
    }
    public function createSpecificDetails(Request $request, $serviceId)
    {
        $path = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();

            $name = time() . '_' . uniqid() . '.' . $extension;

            $file->move('service', $name);
            $path = 'service/' . $name;
        }

        Description::create([
            'service_id' => $serviceId,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $path,

            'note' => $request->note,



        ]);

        return response()->json([
            'message' => 'successflully created'
        ]);
    }
    public function updateSpecificDetails(Request $request, $serviceId)
    {

        $detail = Description::where('service_id', $serviceId)->first();
        if ($request->hasFile('image')) {
            $destination = $detail->image;
            if (File::exists($destination)) {
                File::delete($destination);
            }
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $name = time() . '.' . $extension;
            $file->move('service', $name);
            $path = 'service/' . $name;
        } else {
            $path = $detail->image;
        }



        $detail->description = $request->description;
        $detail->price = $request->price;
        $detail->note = $request->note;

        $detail->image = $path;

        $detail->save();


        return response()->json([
            'message' => 'successflully updated'
        ]);
    }
    public function saveSpecificService($serviceId)
    {


        $service = OptionUser::find($serviceId)->update(['status' => 'pending']);
        

        return response()->json('successfully saved');
    }
    public function viewSellerProfile()
    {
        $data = User::with(['profile', 'profession', 'availability'])
            ->latest()
            ->find(Auth::user()->id);

        return response()->json($data, 200);
    }

    public function DraftGeneralService($serviceId)
    {
        $service = OptionUser::with(['service:id,name,subcategory_id,type', 'service.subcategory:id,name,category_id', 'service.subcategory.category:id,name',  'packages.standards',  'galleries', 'requirements', 'description'])
            ->find($serviceId);


        $standard = Standard::where('option_id', $service->option_id)->with('values')->get();
        $service->standards = $standard;


        return response()->json($service, 200);
    }

    public function DraftSpecificService($serviceId)
    {
        $service = OptionUser::with(['option:id,name', 'service:id,name,subcategory_id,type', 'service.subcategory:id,name,category_id', 'service.subcategory.category:id,name',  'description'])
            ->find($serviceId);



        return response()->json($service, 200);
    }




    public function viewServiceCards()
    {

        $services = OptionUser::whereHas('user', function ($query) {
            $query->where('id', Auth::user()->id);
        })
            ->with(['service:id,type', 'description'])
            ->get();





        return response()->json($services, 200);
    }


    public function getServiceDetails($serviceId)
    {

        $services = $this->service->viewServiceDetails($serviceId);


        return response()->json($services, 200);
    }


    public function viewServiceSummary()
    {
        $data = OptionUser::where('user_id', Auth::user()->id)
            ->select('id', 'option_id', 'status', 'service_id')
            ->with(['option:id,name', 'service'])
            ->withCount('orders')
            ->get();
        if ($data) {
            return ServiceSummaryResource::collection($data);
        }
    }




    public function deleteService($id)
    {
        OptionUser::find($id)->delete();
        return response()->json('successfully deleted');
    }
}
