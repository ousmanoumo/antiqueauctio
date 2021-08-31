import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { RegisterUserService } from '../../services/AuthServices';
function RegisterComponent() {
    const history = useHistory();
    const [fields, setState] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleFieldChange = e => {
        setState({
            ...fields,
            [e.target.id]: e.target.value
        })
    }

    const UserRegister = (e) => {
        e.preventDefault();
        console.log(fields);
        const passwordMatch = checkPasswordMatch(fields.password, fields.password_confirmation);
        if (passwordMatch === true) {
            alert('passwords dont match. please check your password again');
            return;
        }
        RegisterUserService(fields).then((res) => {
            if (res.hasOwnProperty('success') && res.success === true) {
                
                alert(res.message);
                history.push('/login');
            } else if (res.hasOwnProperty('success') && res.success === false) {
               
               alert(res.message);
            }
        }, error => {
            alert(error);
        })
    };

    const checkPasswordMatch = (password, password_confirmation) => {
        return password !== password_confirmation ? true : false;
    }

    return (
        
            <div className='container'>

                <div className='row'>

                    <div className='row col-md-12'>
                        <section class="h-100 gradient-form">
                            <div class="container py-5 h-100">
                                <div class="row d-flex justify-content-center align-items-center h-100">
                                    <div class="col-xl-10">
                                        <div class="card rounded-3 text-black">
                                            <div class="row g-0">
                                                
                                                <div class="col-lg-6 d-flex align-items-center">
                                                    <div class=" px-3 py-4 p-md-5 mx-md-4">
                                                        <img src="https://cdn.scopicsoftware.com/wp-content/uploads/2020/04/Scopic-Logo-Horizontal-White-small.png" alt="logo" />
                                                        <h4 class="mb-4">A web auction application for an antique items seller.</h4>
                                                        <p class="small mb-0">The application will allow users to bid on antique items displayed in the site and admin users to set up items for auction</p>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="card-body p-md-5 mx-md-4">
                                                        <Form  onSubmit={UserRegister}>
                                                            <p>Create an account account</p>

                                                            <div class="form-outline mb-4">
                                                                <input type="text" id="name" name="name" class="form-control" placeholder="fullname" value={fields.name} onChange={handleFieldChange} required />
                                                                <label class="form-label" for="name">name</label>
                                                            </div>
                                                            <div class="form-outline mb-4">
                                                                <input type="email" id="email" name="email" class="form-control" placeholder="email address" value={fields.email} onChange={handleFieldChange} required />
                                                                <label class="form-label" for="email">email</label>
                                                            </div>

                                                            <div class="form-outline mb-4">
                                                                <input type="password" id="password" class="form-control" value={fields.password} onChange={handleFieldChange} required />
                                                                <label class="form-label" for="password">Password</label>
                                                            </div>
                                                            <div class="form-outline mb-4">
                                                                <input type="password" id="password_confirmation" class="form-control" value={fields.password_confirmation} onChange={handleFieldChange} required />
                                                                <label class="form-label" for="password_confirmation">Password_confirmation</label>
                                                            </div>
                                                            <div class="text-center pt-1 mb-5 pb-1">
                                                                <button type='submit' class="btn btn-primary btn-block fa-lg mb-3" >Create an account</button>
                                                            </div>
                                                            <div class="d-flex align-items-center justify-content-center pb-4">
                                                                <p class="mb-0 me-2">You already have an account?</p>
                                                                <a type="button" class="btn btn-outline-danger" href="/login">Log in</a>
                                                            </div>

                                                        </Form>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>



            </div>
    )
}
export default RegisterComponent