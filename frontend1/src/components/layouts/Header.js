import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { LogOutUserService } from '../../services/AuthServices';
import { LoadProfile } from '../../services/ProfileServices';
export default function Header(props) {
    const history = useHistory();
    const [profileUser, setProfileUser] = useState({
        name: "",
        autoAmount: "",
    });
    

    const logOut = () => {
        LogOutUserService().then((res)=>{
            localStorage.removeItem("user-token");
            history.push("/login");
            alert(res.message);
        }, error=>{
            alert(error);
        })
       
    }

    useEffect(()=>{
        LoadProfile().then((res)=>{
            if (res.hasOwnProperty('success') && res.success === true) {
                setProfileUser({
                    name: res.data.name,
                    autoAmount: res.data.max_bid_amount,
                });

            } else if (res.hasOwnProperty('success') && res.success === false) {
               
            }  

        }, error=>{
            alert(error);
        });
    },[]);
    
    

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/dashboard">dashboard</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/mybiddings">My bidded items</Nav.Link>
                    <Nav.Link href="/settings">Setting</Nav.Link>
                    
                    <Nav.Link href='#' className='text-right'>Name: {profileUser.name}</Nav.Link>
                    <Nav.Link href='#' className='text-right'>Auto Bidding Amount: {profileUser.autoAmount}</Nav.Link>
                    <Button href="#" onClick={logOut} className='text-right'>Log out</Button>
                </Nav>
            </Container>
        </Navbar>
    );
}