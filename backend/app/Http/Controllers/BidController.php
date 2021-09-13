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


    public function bidNow(Request $request)
    {

       
        
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
            $newBid = new Bid;
            $newBid->item_id = $request->id;
            $newBid->amount = $request->amount;
            $newBid->user_id = Auth::guard("api")->user()->id;
            $newBid->save(); 
            return response()->json([
                "success" => true,
                "message" => 'First Bidding',
                "data" => $newBid
            ], 200);
        }

        
    }
    public function autoBid(Request $request)
    {
        $user = Auth::guard("api")->user();

        //check if there is a need for auto bidding
        if($request->isAutoBid==false){
            //check if the user has made a bid before on the given item
            $fdbid=Bid::where('item_id',$request->id)   
            ->where('user_id',$user->id)->first();
            if($fdbid){
                $fdbid->auto_bid = false;
                $fdbid->save();
                return response()->json([
                    "success" => true,
                    "message" => 'auto bidding off'
                ], 200); 
            }
        }

        $highest_amount = $request->amount;

        //highest bid
        $data = Bid::query()
                    ->where('item_id', '=', $request->id )
                    ->orderBy('amount','desc')
                    ->first();

        //check if there is any bid on the current item
        if($data){
            //check if the current user is the highest bid
            if($data->user_id == Auth::guard("api")->user()->id){
                $data->auto_bid = true;
                $data->save();
                return response()->json([
                    "success" => true,
                    "message" => 'Auto bidding set and you already have the highest bid',
                ], 200); 
            }

            $highest_amount = $data->amount;
            
        }

        

        //check if the user has made a bid before on the given item
        $fdbid=Bid::where('item_id',$request->id)   
                    ->where('user_id',$user->id)->first();

        if($fdbid){
             //check there is enough amount before creating the new bid
            if($user->max_bid_amount >= ($highest_amount - $fdbid->amount + 1 ) ){

                $user->max_bid_amount -= ($highest_amount - $fdbid->amount + 1) ;
                $user->save();
                $fdbid->amount = $highest_amount + 1;
                $fdbid->auto_bid = true;
                $fdbid->save();
                return response()->json([
                    "success" => true,
                    "message" => 'Set auto bidding',
                    "data" => ['amount'=>$user->max_bid_amount]
                ], 200);

            }
            else{
                return response()->json([
                    "success" => false,
                    "message" => 'Not enough amount for auto-bidding',
                    "data" => ['amount'=>$user->max_bid_amount]
                ], 200);
            }
        }
        else{
            //check there is enough amount before creating the new bid
            if($user->max_bid_amount >= ($highest_amount + 1 ) ){

                $user->max_bid_amount -= ($highest_amount + 1) ;
                $user->save();
                $newBid = new Bid;
                $newBid->item_id = $request->id;
                $newBid->amount = $highest_amount + 1;
                $newBid->auto_bid = true;
                $newBid->user_id = Auth::guard("api")->user()->id;
                $newBid->save(); 
            
                return response()->json([
                    "success" => true,
                    "message" => 'Set auto bidding',
                    "data" => ['amount'=>$user->max_bid_amount]
                ], 200);

            }
            else{
                return response()->json([
                    "success" => false,
                    "message" => 'Not enough amount for auto-bidding',
                    "data" => ['amount'=>$user->max_bid_amount]
                ], 200);
            }

        }

        
    }


}
