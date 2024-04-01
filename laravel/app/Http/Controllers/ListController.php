<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Lists;
use App\Models\OptionUser;
use App\Models\SavedItem;
use App\Services\ServicesService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Expr\FuncCall;

class ListController extends Controller
{
    public $services;
    public function __construct(ServicesService $services) {
        $this->services = $services;
    }
    public function createList(Request $request)
    {
        Lists::create([
            'user_id' => Auth::user()->id,
            'name' => $request->name,
            'description' => $request->description
        ]);

        return response()->json('successfully added');
    }
    public function getList($serviceId)
    {
        $data = Lists::where('user_id', Auth::user()->id)->get();
        $lists = OptionUser::find($serviceId)->lists;
        foreach ($data as $key => $value) {
            $listId = $value->id;
            $value['saved'] = false;
            foreach ($lists as $key => $list) {
                if ($list->id === $listId) {
                    $value['saved'] = true;
                    break;
                }
            }
        }
        return response()->json($data);
    }


    public function addtoFavourite($listId, $serviceId)
    {
        SavedItem::create([
            'service_id' => $serviceId,
            'list_id' => $listId,
        ]);

        return response()->json('successfully added');
    }
    public function addtoWishList($listId, $serviceId)
    {
        $option = OptionUser::find($serviceId);
        $option->lists()->syncWithoutDetaching($listId);

        return response()->json('successfully added');
    }


    public function getSavedItems()
    {
        $data = Lists::where('user_id', Auth::user()->id)
        ->with(['services:id', 'services.galleries'])
        ->get()
        ->map(function ($item) {

            $item->first_service = $item->services->first();
            $item->service_count = $item->services->count();
            unset($item->services);
            if ($item->first_service) {
                $item->first_service->first_gallery_image = isset($item->first_service->galleries[0]) ? $item->first_service->galleries[0]->image : null;
                unset($item->first_service->galleries);
            }
            return $item;
        });
        return response()->json($data);


    }
    public function getItemsByList($id)
    {

        $query = OptionUser::whereHas('lists',function($query) use($id){
            $query->where('list_id',$id);
        });
        $services=$this->services->getBuyerServiceCards($query)->get();

     
        return response()->json($services);
       
       


    }
}
