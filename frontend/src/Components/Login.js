import React,{useRef, useState} from  'react';

import {useHistory ,Router} from 'react-router-dom'

import './Login.css'


function Login() {
    const endPoint='http://localhost:1337/auth/local';
    const identifierRef=useRef();
    const passwordRef=useRef();
    const history=useHistory();
    const[error,setError]=useState('');
    const register=()=>{
        
        history.push('/register')
        
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    
    

    const login=async()=>{
        const identifier=identifierRef.current.value;
        const password=passwordRef.current.value;
        // history.push('/')
        try {
            const{jwt,user}= await fetch(endPoint,{
                method:"POST",
                headers:{'Content-Type':'Application/json'},
                body:JSON.stringify({
                    identifier,
                    password
    
                })
            }).then(res=>{
                if(res.status!==200)
                {
                    throw new Error('Wrong Login Check Username and Password');
                }
                history.push('/');
               return res.json();
               
                
            }
            
            )
            console.log({jwt,user})
            window.sessionStorage.setItem("jwt" ,jwt);
            window.sessionStorage.setItem("user" , JSON.stringify(user));
            
        } catch (e) {
            setError(e.toString());
            
        }
       
       

       
      
       

    }

    return (
        <div className="container py-5" >
            <h1 className="text-center">LOGIN</h1>
            
           
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <div className="aler alert-danger">
                {error && <h5 className="text-center" style={{color:"red"}}>{error}</h5>}
                </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label >E-mail or Username :</label>
                            <input ref={identifierRef} type="text" className="form-control " placeholder="Enter E-mail or Username" name="identifier"  ></input>

                        </div>
                        <div className="form-group">
                            <label>Password :</label>
                            <input ref={passwordRef} type="password" name="password" placeholder="************" className="form-control "></input>
                        </div>
                        <button type="submit" className="btn btn-outline-warning" onClick={()=>login()}>Login</button> {"              "}
                        <button type="submit" className="btn btn-outline-success" onClick={register}>Register</button>


                    </form>

                </div>

            </div>


    
        </div>
    )
}

export default Login
