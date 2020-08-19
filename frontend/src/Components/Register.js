
import React, { useRef ,useState } from 'react';
import {useHistory} from 'react-router-dom';

import './Register.css'


export default function Register() {
    const endPoint = 'http://localhost:1337/auth/local/register';
    const userRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef=useRef();
    const history=useHistory();
    const [error ,setError]=useState('');
    const formSubmit=(e)=>{
        e.preventDefault();
        

    }
    const login=()=>{
        history.push('/login');
    }
    
    const register = async() => {
        // history.push('/login');
        const username = userRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword=confirmPasswordRef.current.value;
        try {
            const {jwt,user}=await fetch(endPoint,{
                method:"POST",
                headers:{"Content-Type":"Application/json"},
                body:JSON.stringify({
                    username,
                    email,
                    password
                })
            }).then(res=>{
                // if(res.status !== 200)
                // {
                //     throw new Error('some thing went wrong in registeration')
                // }
                
               if(res.status !== 200 && password!== confirmPassword)
                {
                    throw new Error('Password not matching ');
                    
                }
                if(res.status !==200&&!username || !email ||!password)
                {
                    throw new Error('Fill All Feilds ');
                }
                history.push('/login')
               
                   return res.json();
                    
                   
                    

                
            }
                );

                console.log({jwt,user})
                    window.localStorage.setItem("jwt" ,jwt);
                    window.localStorage.setItem("user" , JSON.stringify(user));
                    
            
            
        } catch (e) {
            setError(e.toString())
            
        }
       
         
        
      
    }

    return (
        <div>
            <div className="container py-5" >
                
                <h1 className="text-center" >REGISTER</h1>
                
                     
                <br></br>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                    <div className="aler alert-danger">
                {error && <h5 className="text-center" style={{color:"red"}}>{error}</h5>}
                </div>
                        <form onSubmit={formSubmit}  >
                            <div className="form-group">
                                <label>Username :</label>

                                <input  ref={userRef} type="text" name="username" className="form-control" placeholder="Enter Username"></input>

                            </div>
                            <div className="form-group">
                                <label>E-mail :</label>
                                <input ref={emailRef} type="email" name="email" className="form-control" placeholder="Enter E-mail"></input>

                            </div>
                            <div className="form-group">
                                <label>Password :</label>
                                <input ref={passwordRef} type="password" name="username" className="form-control" placeholder="**************"></input>

                            </div>
                            <div className="form-group">
                                <label>Confirm-Password :</label>
                                <input ref={confirmPasswordRef} type="password" name="confirm-password" className="form-control" placeholder="**************"></input>

                            </div>
                            <button type="submit" onClick={ register} className="btn btn-outline-warning">Register</button>{"           "}
                            <button type="submit" onClick={ login} className="btn btn-outline-success">Login</button>
                        </form>

                    </div>

                </div>
            </div>

        </div>
    )
}


