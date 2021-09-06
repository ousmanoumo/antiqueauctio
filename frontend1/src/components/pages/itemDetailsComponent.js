import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { LoadSingleItem } from '../../services/ItemsServices';
import { useHistory, useParams } from 'react-router';
import CurrentBiddingPrice from './currentBiddingComponent';

const ItemDetailsComponent = () => {
    const history = useHistory();
    //item id
    const { id } = useParams();
    //current item
    const [item, setItem] = useState([]);
    //time remaining to close the auction
    const [leftTime, setLeftTime] = useState(0);
    //auction closing date 
    const [rmTime, setRmTime] = useState("");
    //timer for display
    const [timerMessage, setTimerMessage] = useState('');

    //load item information
    useEffect(() => {
        LoadSingleItem(id).then((res) => {

            if (res.hasOwnProperty('success') && res.success === true) {
                setItem(res.data);
                setRmTime(new Date(res.data.closing_date).getTime());
            } else if (res.hasOwnProperty('success') && res.success === false) {
                history.push('/dashboard');
            }
        }, error => {
            history.push('/dashboard');
        })

    }, [id]);

    //set the timer
    useEffect(() => {
        let interval = null;
        // Get today's date and time
        let nowTime = null;

        // Find the distance between now and the count down date
        let distance = null;

        interval = setInterval(() => {
            nowTime = new Date().getTime();
            if (rmTime !=='') {
                distance = rmTime - nowTime;
                setLeftTime(distance);
                updateTimer(distance);
                if(distance < 0){
                    clearInterval(interval);
                    setTimerMessage('Auction has expired')
                }
               
             }
        }, 1000);
        return () => clearInterval(interval);
    }, [rmTime]);


    function updateTimer(distance) {
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update the timer display 
        setTimerMessage(days + "days " + hours + "h " + minutes + "m " + seconds + "s ");
    }


    return (
        <Container>
            <Row>
                <Col>

                    <div className="card mt-20" >
                        <div className="row g-0">
                            <div class="col-md-4">
                                <img src={"http://localhost:8000/storage/images/" + item.imgurl} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text"><small className="text-muted">Starting Price: ${item.bid_price} </small></p>
                                    <p className="card-text"><small className="text-muted">Closing date: {item.closing_date} </small></p>
                                    <p className="card-text"><small className="text-muted">Time remaining: {timerMessage}</small></p>
    
                                    {CurrentBiddingPrice(id, item.bid_price,leftTime)}
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}
export default ItemDetailsComponent;