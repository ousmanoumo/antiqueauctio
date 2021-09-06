<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Bid;
use Illuminate\Http\Request;
use Auth;

class ItemController extends Controller
{
    public function __construct(){
        $this->middleware("auth:api");
       
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $responseMessage = "List Items";
        $data = Item::query()
                    ->where('name', 'like', '%' . $request->name . '%')
                    ->orWhere('description', 'like', '%' . $request->name . '%')
                    ->orderByDesc('bid_price')->paginate(10);
        return response()->json([
            "success" => true,
            "message" => $responseMessage,
            "data" => $data
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $responseMessage = "Item Details";
        $data = Item::query()
                    ->where('id', '=', $request->id )
                    ->first();
        return response()->json([
            "success" => true,
            "message" => $responseMessage,
            "data" => $data
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        //
    }

    public function bidhighest(Request $request){

        $responseMessage = "Highest bidding";
        $data = Bid::query()
                    ->where('item_id', '=', $request->id )
                    ->orderBy('amount','desc')
                    ->first();

        if($data){
            return response()->json([
                "success" => true,
                "message" => $responseMessage,
                "data" => [
                    'amount'=>$data->amount,
                    'isBidder' => $data->user_id == Auth::guard("api")->user()->id
                ]
            ], 200);
        }
        else{
            return response()->json([
                "success" => false,
                "message" => 'There is no bidding',
                "data" => $data
            ], 200);
        }
        
    }
}
