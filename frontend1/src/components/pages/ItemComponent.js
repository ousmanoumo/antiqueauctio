import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemComponent = (item, index) => {
    return (
        <Col md={3}>
            <Card className="text-black " key={index} >

                <Card.Img variant="top" src={"http://localhost:8000/storage/images/" + item.imgurl} />

                <Card.Body key={index} >
                    <Card.Title>Name: {item.name}</Card.Title>
                    <Card.Text>
                        Price: ${item.bid_price} Closing-date: {item.closing_date}
                    </Card.Text>
                    <Link
                        to={`/item/${item.id}`}
                    >
                        <Button variant="primary">
                            Bid Now

                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ItemComponent;