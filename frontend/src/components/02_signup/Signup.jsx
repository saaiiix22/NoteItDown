import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";

const Signup=()=>{

    let [inp,setInp] = useState({
        name:"",
        email:"",
        phone:"",
        password:""
    })
    let {name,email,phone,password} = inp

    // const navigate = useNavigate()
    const handleForm=async(e)=>{
        e.preventDefault()
        // console.log(inp);
        const data = await axios.post("http://localhost:2201/create",inp)
        console.log(data.data.message);
        if(data.data.message== "User Created"){
            toast.success("User Created")
            // navigate("/")
        }
        else{
            // alert("User Already Exists")
            toast.error("User Already Exists")
        }
    }

    const handleInp=(e)=>{
        let {name,value} = e.target
        setInp({...inp,[name]:value})
    }

    return(

        <div className="h-[70%] w-[30%] rounded-[7px] shadow-2xl flex flex-col justify-around items-center bg-slate-50">
            <div className="top h-[10%] w-[100%] flex justify-center items-end text-[40px] font-[600] text-blue-700">Please SignUp !!</div>
                <form action="" className="h-[70%] w-[100%] flex justify-start items-center flex-col rounded-[7px] " onSubmit={handleForm}>
                    <input type="text" className="h-[40px] w-[70%] ps-4 rounded-[3px] border-2 border-gray-200" placeholder="Enter Name" name="name" value={name}  onChange={handleInp}/>
                    <br /> 
                    <input type="text" className="h-[40px] w-[70%] ps-4 rounded-[3px] border-2 border-gray-200" placeholder="Enter Email" name="email" value={email}  onChange={handleInp}/>
                    <br />
                    <input type="text" className="h-[40px] w-[70%] ps-4 rounded-[3px] border-2 border-gray-200" placeholder="Enter Phone " name="phone" value={phone}  onChange={handleInp}/>
                    <br />
                    <input type="password" className="h-[40px] w-[70%] ps-4 rounded-[3px] border-2 border-gray-200" placeholder="Enter Password" name="password" value={password} onChange={handleInp}/>
                    <br />  
                    <button className="h-[40px] w-[70%] bg-blue-500 rounded-[3px] text-white">Login</button>
                    <br />
                    <NavLink to="/login">Already have an account?Login</NavLink>
                </form>
        </div>
    )
}
export default Signup