import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BidNowService } from "../../services/ItemsServices";

const BidNowComponent = (id, HighestBid, isTrue) => {

    
    const [bid, setBid] = useState('');
    const handleFieldChange = e => {
        setBid(e.target.value);
    }
    const bidHandle= (e) =>{
        e.preventDefault();
        if(bid < HighestBid + 1){
            alert('Your bid should be greater than or equal to '+HighestBid +1);
            return ;
        }
        BidNowService(id, bid).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                alert(res.message);
                console.log("true "+res);
            } else if (res.hasOwnProperty('success') && res.success === false) {
                alert(res); console.log("false "+res);
            }
        }, error => {
            alert(error);
            console.log(error);
        });
    }

    return (
        <div>
            {isTrue?
            <Form onSubmit={bidHandle} className="form-control">

                <div class="form-outline mb-4">
                    <input type="number" id="bid" name="bid" class="form-control" placeholder="place your bid here..." value={bid} onChange={handleFieldChange} required />
                    <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Bid now </button>
                </div>

            </Form>
            :
            <p>Can not bid at this time around</p>
            }
        </div>

    );
}

export default BidNowComponent;