import React ,{useEffect,useRef,useState} from 'react'
import {useHistory} from 'react-router-dom';
import './Home.css'

function Home() {
    
    const history=useHistory();
    const titleRef=useRef();
     const jwtRef=useRef();
     const doneRef=useRef();
     const [todos,setTodos]=useState([]);
     const [error ,setErrors]=useState([]);
     const endPoint='http://localhost:1337/todos';
     
     const logout=()=>{
         window.localStorage.removeItem('jwt');
         history.push('/login');
     }
    
     const formHandler=(e)=>{
           e.preventDefault();
     }
     const getTodos=async()=>{
         const res=await fetch(endPoint,
            {method:"Get",
                headers:{'Authorization':`Bearer ${jwtRef.current}`}
            }).then(res=>res.json())
            console.log(res);
            setTodos(res );
            setErrors(error)

     }
    useEffect(()=>{
        const jwt=window.sessionStorage.getItem('jwt');
         console.log({jwt});
         if(!jwt){
            history.push('/login');
         }

     jwtRef.current=jwt;
     getTodos();
    },[]);
    const createTodo=async()=>{
        const title=titleRef.current.value;
        const done=doneRef.current.value;
        
        try {
            const res= await fetch(endPoint,{
                method:"POST",
                headers:{"Content-Type":"Application/json",'Authorization':`Bearer ${jwtRef.current}`},
                body:JSON.stringify({
                    title,
                    done
                    
    
                })
    
    
            }).then(res=>{
                if(  !title || res.status !== 200)
                {
                    throw new Error('Enter Title ');
                   
                }
                else{
                    history.push('/');
                  return res.json();

                }
                
               
            });
            const todo=[...todos,res];
            setTodos(todo);
          //  console.log(todos)
            
        } catch (e) {
            setErrors(e.toString())
        }
        
       

    }
    

    return (
        <div className="todo-wrapper">
            <div className="logout">
            <button className="btn btn-outline-primary align-right" onClick={logout} >Logout</button>
            </div>
            
           <h1>TODO LIST</h1> 
           <div className="row">
               <div className="col-md-6 offset-md-3">
               <div className="aler alert-danger">
                {error && <h5 className="text-center" style={{color:"red"}}>{error}</h5>}
                </div>
                   <form onSubmit={formHandler}>
                   <div className="form-group">
                       <label>Todo Title :</label>
                      <input required ref={titleRef} className="form-control" type="text" name="todo" placeholder="Todo Title"></input>
                      <br></br>
                      <select className="form-control sel" ref={doneRef} >
                          <option className="form-control sel" value={true}>Marked</option>
                          <option className="form-control sel" value={false}>Not Marked</option>
                      </select>
                   </div>
                   <button onClick={createTodo} type="submit" className="btn btn-outline-warning btn-lg">Create Todo</button>
                   </form>
               </div>
               <br></br>

           </div>
           
           <h2 className="py-3">Todo Members</h2>
                {todos.map(todo=>(
                    <div className="todoItem" >
                        
                       <h5><div ><input type="checkbox" checked={todo.done}/>  {todo.title}</div>   </h5>
                       
                    </div>

                ))}
        </div>
    )
}

export default Home
