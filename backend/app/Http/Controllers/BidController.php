<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use Illuminate\Http\Request;
use Auth;

class BidController extends Controller
{
    public function __construct(){
        $this->middleware("auth:api");
       
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }


    public function bidNow(Request $request)
    {

        $newBid = new Bid;
        $newBid->item_id = $request->id;
        $newBid->amount = $request->amount;
        $newBid->user_id = Auth::guard("api")->user()->id;
        
        $fdbid=Bid::where('item_id',$request->id)   
                    ->where('user_id',Auth::guard("api")->user()->id)->first();
        if($fdbid){
            $fdbid->amount = $request->amount;
            $fdbid->save();
            return response()->json([
                "success" => true,
                "message" => 'Bid updated',
                "data" => ['amount'=>$fdbid->amount]
            ], 200);
        }
        else{
            $newBid->save(); 
            return response()->json([
                "success" => true,
                "message" => 'First Bidding',
                "data" => $newBid
            ], 200);
        }

        
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
     * @param  \App\Models\Bid  $bid
     * @return \Illuminate\Http\Response
     */
    public function show(Bid $bid)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Bid  $bid
     * @return \Illuminate\Http\Response
     */
    public function edit(Bid $bid)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Bid  $bid
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bid $bid)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Bid  $bid
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bid $bid)
    {
        //
    }
}
