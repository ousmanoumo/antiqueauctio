import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BidNowService } from "../../services/ItemsServices";

const BidNowComponent = (id) => {

    const [bid, setBid] = useState('');
    const handleFieldChange = e => {
        setBid(e.target.value);
    }
    const bidHandle= (e) =>{
        e.preventDefault();
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
            <Form onSubmit={bidHandle} className="h">

                <div class="form-outline mb-4">
                    <input type="number" id="bid" name="bid" class="form-control" placeholder="place your bid here..." value={bid} onChange={handleFieldChange} required />
                    <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Bid now </button>
                </div>

            </Form>
        </div>

    );
}

export default BidNowComponent;