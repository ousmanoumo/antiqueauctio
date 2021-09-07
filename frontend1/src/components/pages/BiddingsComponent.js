import React  from 'react';
import ItemComponent from './ItemComponent';
import { Row, Col, Container } from 'react-bootstrap';
import { LoadBidItems } from '../../services/ItemsServices';
import Pagination from 'react-js-pagination'

class BiddingsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: ' ',
            name: "",
        };

        this.getItems.bind(this);
    }


    //Load items from backend with regards to the page number and a text to look into in 
    getItems = (pageNumber) => {
        LoadBidItems(pageNumber).then((res) => {
            this.setState({ items: res });
            console.log(res);
            if (res.hasOwnProperty('success') && res.success === true) {
            } else if (res.hasOwnProperty('success') && res.success === false) {
            }
        }, error => {
            console.log(error);
            this.setState({ items: error });
        })
    }

    


    componentDidMount() {
        this.getItems(1);
    }



    renderItems = () => {
        const { data, current_page, per_page, total } = this.state.items.data;
        return (
            <div>
                <Row>
                    {data.map((element, index) => {
                        return ItemComponent(element, index);

                    })}
                </Row>

                <div className='text-center'>
                    <Pagination
                        activePage={current_page}
                        totalItemsCount={total}
                        ItemsCountPerPage={per_page}
                        onChange={this.getItems.bind(this)}
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First"
                        lastPageText="Last"
                    />
                </div>



            </div>);
    }
    render() {
        return (
            <Container>
                {this.state.items !== "" && this.state.items !== null && this.state.items.success === true ?
                    <div className="text-center">
                        <br />
                        <h1 className="text-center Jumbotron">List of items you have make a bid</h1>
                        {this.renderItems()}
                    </div>



                    :
                    <div>Loading...</div>}

            </Container>
        );
    }


}
export default BiddingsComponent;