import React  from 'react';
import ItemComponent from './ItemComponent';
import { Row, Col, Container } from 'react-bootstrap';
import { LoadItems } from '../../services/ItemsServices';
import Pagination from 'react-js-pagination'

class DashboardComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: ' ',
            name: "",
        };

        this.getItems.bind(this);
    }

    handleFieldChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

        console.log(e.target.value);
        this.getItems(1,e.target.value);
    }

    getItems = (pageNumber,strItem=this.state.name) => {
         LoadItems(pageNumber, strItem).then((res) => {
            this.setState({ items: res });
            if (res.hasOwnProperty('success') && res.success === true) {
            } else if (res.hasOwnProperty('success') && res.success === false) {
            }
        }, error => {
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
                        <h1 className="text-center Jumbotron">Dashboard, bidding elements</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        <div className="form-outline mb-4">
                            <input type="text" id="name" name="name" className="form-control" placeholder="Search an item By name or description" value={this.state.name} onChange={this.handleFieldChange} required />
                        </div>
                        {this.renderItems()}
                    </div>



                    :
                    <div>Unable to display data</div>}

            </Container>
        );
    }


}
export default DashboardComponent;