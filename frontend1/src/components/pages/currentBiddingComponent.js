import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { HighestBidService } from "../../services/ItemsServices";
import BidNowComponent from "./BidNowComponent";

const CurrentBiddingComponent = (idItem, leftTime) => {
    const history = useHistory();
    const [bidHighest, setBidHighest] = useState(['Loading...']);
    const [isHighestBidder, setIsHighestBidder] = useState(false)

    useEffect(() => {
        //check to look for an update on the bidding amount
        let interval = null;
        
        interval = setInterval(() => {

            HighestBidService(idItem).then((res) => {
                if (res.hasOwnProperty('success') && res.success === true) {
                   console.log(res.data);
                   setBidHighest(res.data.amount);
                  // setIsHighestBidder(res.data.isBidder);
                   
                } else if (res.hasOwnProperty('success') && res.success === false) {
                    setBidHighest('No bidding');                  
                   // setIsHighestBidder(false);       
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
            { true==true ? BidNowComponent(idItem): <p>You can not make a bid at this time</p>}
        </div>

    );
}

export default CurrentBiddingComponent;