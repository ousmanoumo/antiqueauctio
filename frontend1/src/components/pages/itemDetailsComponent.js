import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { LoadSingleItem } from '../../services/ItemsServices';
import { useHistory, useParams } from 'react-router';
import CurrentBiddingPrice from './currentBiddingComponent';

const ItemDetailsComponent = () => {
    const history = useHistory();
    const { id } = useParams();
    const [item, setItem] = useState([]);

    useEffect(() => {
         LoadSingleItem(id).then((res) => {

            if (res.hasOwnProperty('success') && res.success === true) {
                setItem( res.data );
            } else if (res.hasOwnProperty('success') && res.success === false) {
                history.push('/dashboard');
            }
        }, error => {
            history.push('/dashboard');
        })

    }, [id]);

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
                                    <p className="card-text"><small className="text-muted">Price: ${item.bid_price} Closing-date: {item.closing_date}</small></p>
                                    {CurrentBiddingPrice(id)}
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>

    );
}
// class ItemDetailsComponent extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             bidding_price: ' ',
//         };

//         this.getItems.bind(this);
//     }

//     handleFieldChange = (e) => {
//         this.setState({
//             [e.target.id]: e.target.value
//         })

//     }




//     renderItems = () => {
//         const {data, current_page, per_page, total} = this.state.items.data;
//         return (
//             <div>
//                 <Row>

//                     {data.map((element, index) => {
//                         return (

//                             <Col md={3}>
//                                 {ItemComponent(element, index)}
//                             </Col>
//                         );

//                     })}
//                 </Row>

//             </div>);
//     }
//     render() {
//         return (
//             <Container>
//                 <Header />
//                 <div class="card mb-3" style="max-width: 540px;">
//                     <div class="row g-0">
//                         <div class="col-md-4">
//                             <img src="..." class="img-fluid rounded-start" alt="..." />

//                             <div class="col-md-8">
//                                 <div class="card-body">
//                                     <h5 class="card-title">Card title</h5>
//                                     <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//                                     <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </Container>
//         );
//     }


// }
export default ItemDetailsComponent;