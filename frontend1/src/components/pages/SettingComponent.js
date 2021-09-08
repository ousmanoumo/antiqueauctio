import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { SettingService } from "../../services/ItemsServices";

const SettingComponent = () => {


    const [max_bid_amount, setMaxBidAmount] = useState('');
    const handleFieldChange = e => {
        setMaxBidAmount(e.target.value);
    }
    const handler = (e) => {
        e.preventDefault();
        if (max_bid_amount <= 0) {
            alert('Your amount should be greater than 0');
            return;
        }
        SettingService(max_bid_amount).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                alert(res.message);
            } else if (res.hasOwnProperty('success') && res.success === false) {
                alert(res); console.log(res);
            }
        }, error => {
            alert(error);
        });
    }

    return (
        <Row>
            <Col>
                <h3 classNamek="text-center">Update the maximum amount to be used for auto bidding</h3>
                <Form onSubmit={handler} className="form-control" style={{ display: "flex-center", flexDirection: "row", alignItems: "center",  justifyContent: "space-between" }}>

                    <div class="form-outline mb-4">
                        <input type="number" id="max_bid_amount" name="max_bid_amount" className="form-control" placeholder="place your amount here..." value={max_bid_amount} onChange={handleFieldChange} required />
                        <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit"> Update Maximum amount </button>
                    </div>

                </Form>
            </Col>
        </Row>

    );
}

export default SettingComponent;