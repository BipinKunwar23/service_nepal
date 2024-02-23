<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\FAQ;
use App\Models\gallery;
use App\Models\package;
use App\Models\Price;
use App\Models\Requirements;
use App\Models\ScopeUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;

class SellerServiceController extends Controller
{
    public function createOverView(Request $request)
    {
        $user = User::find(Auth::user()->id);

      $user->scopes()->attach([$request->scopeId=>[
            'service_id' => $request->serviceId,
            'subcategory_id' => $request->subcategoryId,
            'category_id' => $request->categoryId,
            'title' => $request->title,
            'search' => $request->search,
            'active'=>false
        ]]);

        $service=ScopeUser::select('id')->where('user_id',Auth::user()->id)->where('scope_id',$request->scopeId)->first();
        
        return response()->json([
            'serviceId'=>$service->id,
            'message' => 'successflully created'
        ]);
    }
    public function createService(Request $request)
    {

        // return response()->json($request->all());
        $price = Price::create(
            [
                'service_id' => $request->serviceId,
                'additional' => $request->additional,
                'delivery' => $request->delivery,
                'emergency' => $request->emergency,
                'refund' => $request->refund,



            ]
        );
        package::create(collect($request->basic)->merge([
            'price_id' => $price->id,
            'package' => 'basic',
        ])->toArray());
        package::create(collect($request->standard)->merge([
            'price_id' => $price->id,
            'package' => 'standard',
        ])->toArray());

        package::create(collect($request->premium)->merge([
            'price_id' => $price->id,
            'package' => 'premium',
        ])->toArray());
        return response()->json([
            'message' => 'successfullly created',

        ], 200);
    }

    public function createPackage(Request $request)
    {
        Package::create([
            'price_id'=>$request->price_id,
            'name'=>$request->name,
            'description'=>$request->description,
            'finishing'=>$request->finishing,
            'materials'=>$request->materials ?1 :0,
            'price'=>$request->price,
            'size'=>$request->size,
            'numbers'=>$request->numbers,
            'revision'=>$request->revision,
            'gurantee'=>$request->gurantee ? 1: 0,
            'refundable'=>$request->refundable,




        ]);
    }

    public function createGallery(Request $request)
    {
        $path = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();

            $name = time() . '_' . uniqid() . '.' . $extension;

            $file->move('service', $name);
            $path = 'service/' . $name;
        }
        ScopeUser::where('id', $request->serviceId)->update(['image' => $path]);
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
                    'service_id' => $request->serviceId,
                    'image' => $image
                ]);
            }
        }

        return response()->json([
            'message' => 'Successfully Created'
        ]);
    }

    public function createFaq(Request $request)
    {
        ScopeUser::where('id', $request->serviceId)->update(['description' => $request->description]);
        foreach ($request->faqs as  $items) {
            FAQ::create([
                'service_id' =>$request->serviceId,
                'question' => $items['question'],
                'answer' => $items['answer'],
            ]);
        }

        return response()->json([
            'message'=>'successfully inserted'
        ],200);
    }

    public function createRequirement(Request $request)
    {
        Requirements::create([
            'service_id'=>$request->serviceId,
            'buyer'=>$request->buyer,
            'material'=>$request->materials,
            'note'=>$request->note,
            'service_term'=>$request->service_term,
            'payment_term'=>$request->payment_term,


            
        ]);
        ScopeUser::where('id',$request->serviceId)->update(['active'=>true]);
        return response()->json([
            'message' => 'Successfully Created'
        ]);
    }


    public function viewSellerProfile(){
        $data = User::
        with(['profile', 'profession', 'availability'])
        ->latest()
        ->find(Auth::user()->id);
  
      return response()->json($data, 200);
    }

    public function DraftService()
    {
      $data = ScopeUser::where('user_id', Auth::user()->id)
        ->with(['category:id,name', 'subcategory:id,name', 'service:id,name', 'scope:id,name', 'prices.packages', 'faqs', 'galleries', 'requirements'])
        ->latest()
        ->first();
  
      return response()->json($data, 200);
    }

  public function DraftServiceCard()
    {
     
      $data = ScopeUser::where('active',false)->where('user_id', Auth::user()->id)
        ->select('id','title','image')
        ->get();
    
  
      return response()->json($data, 200);
    }

    public function ActiveService()
    {
     
      $data = ScopeUser::where('active',true)->where('user_id', Auth::user()->id)
        ->select('id','title','image')
        ->get();
    
  
      return response()->json($data, 200);
    }
    public function getServiceDetails($serviceId)
    {
     
      $data = ScopeUser::
      with(['user:id,name','user.profile:id,user_id,photo','category:id,name', 'subcategory:id,name', 'service:id,name', 'scope:id,name', 'prices.packages', 'faqs', 'galleries', 'requirements'])
       ->find($serviceId);
  
  
      return response()->json($data, 200);
    }
    

 
}
