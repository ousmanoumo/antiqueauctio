import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { HighestBidService } from "../../services/ItemsServices";
import BidNowComponent from "./BidNowComponent";

const CurrentBiddingComponent = (idItem, leftTime) => {
    const history = useHistory();
    const [bidHighest, setBidHighest] = useState(['Loading...']);


    useEffect(() => {
        //check to look for an update on the bidding amount
        let interval = null;
        
        interval = setInterval(() => {

            HighestBidService(idItem).then((res) => {
                if (res.hasOwnProperty('success') && res.success === true) {
                   console.log(res.data);
                   setBidHighest(res.data);
                   
                } else if (res.hasOwnProperty('success') && res.success === false) {
                    setBidHighest('No bidding');                  
                                
                }
            }, error => {
                alert(error);
                history.push('/dashboard');
            }); 
            
        }, 2000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            <span> The current Highest bid is $ {bidHighest.amount} </span>
            { bidHighest.isBidder===false ? BidNowComponent(idItem): <p>You are the highest bidder</p>}
        </div>

    );
}

export default CurrentBiddingComponent;