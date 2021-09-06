import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { HighestBidService } from "../../services/ItemsServices";
import BidNowComponent from "./BidNowComponent";

const CurrentBiddingComponent = (idItem,bid_price, leftTime) => {
    const [bidHighest, setBidHighest] = useState(0);
    const [isHighestBidder, setIsHighestBidder] = useState(0);
    const history = useHistory();


    useEffect(() => {
        //check to look for an update on the bidding amount
        let interval = null;
        
        interval = setInterval(() => {

            console.log(idItem);
            HighestBidService(idItem).then((res) => {
                if (res.hasOwnProperty('success') && res.success === true) {
                   console.log(res.data);
                   console.log(idItem);
                   setBidHighest(res.data.amount);
                   setIsHighestBidder(0);
                   if (res.data.isBidder === true) {
                        setIsHighestBidder(1);
                   }
                   
                   
                } else if (res.hasOwnProperty('success') && res.success === false) {
                    setBidHighest( bid_price);
                   console.log(idItem);
                    setIsHighestBidder(0);                
                   
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
            <span> The current Highest bid is $ {bidHighest} </span>
            <span>{isHighestBidder? <p>Your have currently the highest bid</p> 
            : <p>Your bid is not the highest</p>
            }</span>

            {BidNowComponent(idItem,bidHighest, isHighestBidder==0 && leftTime > 0)}
        </div>

    );
}

export default CurrentBiddingComponent;