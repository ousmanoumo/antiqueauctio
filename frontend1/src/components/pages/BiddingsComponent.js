import React from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
function BiddingsComponent() {
    const history = useHistory();
    const gotToDashboard = (e, url) => {
        history.push(url);
    }
    return (
       <Container>
           <div>My bidding</div>
       </Container>
    )
}
export default BiddingsComponent