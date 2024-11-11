import React, { useState } from "react";
import {toast} from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Forget=()=>{

    let [inp,setInp] = useState({
        email:"",
        password:"",
        confirmPass:""
    })

    let {email,password,confirmPass} = inp

    const handleInp=(e)=>{
        let {name,value} = e.target
        setInp({...inp,[name]:value})
    }

    const navigate = useNavigate()
    const handleForm=async(e)=>{
        e.preventDefault()
        console.log(inp);

        const {data} = await axios.put("http://localhost:2201/reset",inp)
        // console.log(data.message);
        if(data.message == "User updated Successfully"){
            toast.success("User Updated Successfully")
            navigate("/login")
        }
        else{
            toast.error("User Updation Failed")
        }
        
    }

    return(
        
        <div className="h-[70%] w-[30%] rounded-[7px] shadow-2xl flex flex-col justify-around items-center bg-slate-50">
            <div className="top h-[20%] w-[100%] flex justify-center items-end text-[40px] font-[600] text-blue-700">Please Reset !!</div>
            <form action="" className="h-[60%] w-[100%] flex justify-start items-center flex-col rounded-[7px] " onSubmit={handleForm}>
                <input type="text" className="h-[40px] w-[70%] ps-4 rounded-[3px] border-2 border-gray-200" placeholder="Enter Email" name="email" value={email}  onChange={handleInp}/>
                <br />
                <input type="password" className="h-[40px] w-[70%] ps-4 rounded-[3px] border-2 border-gray-200" placeholder="Enter New Password" name="password" value={password} onChange={handleInp}/>
                <br />
                <input type="password" className="h-[40px] w-[70%] ps-4 rounded-[3px] border-2 border-gray-200" placeholder="Confrim Password" name="confirmPass" value={confirmPass} onChange={handleInp}/>
                <br />  
                <button className="h-[40px] w-[70%] bg-blue-500 rounded-[3px] text-white">Reset</button>
                <br />               
            </form>
        </div>
    )
}
export default Forget