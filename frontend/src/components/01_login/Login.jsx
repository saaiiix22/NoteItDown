import React, { useState } from "react";
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const Login=()=>{
    

    const [inp,setInp] = useState({
        email:"",
        logPassword:""
    })

    let {email,logPassword}  = inp

    const handleInp=(e)=>{
        let {name,value} = e.target
        setInp({...inp,[name]:value})
    }

    const navigate = useNavigate()
    const handleForm=async(e)=>{
        e.preventDefault()
        // console.log(inp);
        const {data} = await axios.post("http://localhost:2201/login",inp)
        console.log(data);
        if(data.message == "login successful"){
            toast.success(`Welcome ${data.name}`) 
            localStorage.setItem("access-token",data.token)
            localStorage.setItem("name",data.name)
            navigate("/dashboard")
        }
        else{
            toast.error("Login Failed")
        }
        
    }

    return(
        <div className="h-[70%] w-[30%] rounded-[7px] shadow-2xl flex flex-col justify-around items-center bg-slate-50">
            <div className="top h-[20%] w-[100%] flex justify-center items-end text-[40px] font-[600] text-blue-700">Please Login !!</div>
            <form action="" className="h-[60%] w-[100%] flex justify-start items-center flex-col rounded-[7px] " onSubmit={handleForm}>
                <input type="text" className="h-[40px] w-[70%] ps-4 rounded-[3px] border-2 border-gray-200" placeholder="Enter Email" name="email" value={email}  onChange={handleInp}/>
                <br />
                <input type="password" className="h-[40px] w-[70%] ps-4 rounded-[3px] border-2 border-gray-200" placeholder="Enter Password" name="logPassword" value={logPassword} onChange={handleInp}/>
                <br />  
                <NavLink to="/forget">Forget Password?</NavLink>
                <br />
                <button className="h-[40px] w-[70%] bg-blue-500 rounded-[3px] text-white">Login</button>
                <br />               
                <NavLink to="/signup">Dont have an account?SignUp</NavLink>
            </form>
        </div>
    )
}
export default Login