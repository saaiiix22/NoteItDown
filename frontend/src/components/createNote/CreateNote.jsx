import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNote=()=>{

    const [inp,setInp] = useState({
        title:"",
        content:"",
        subject:""
    })
    const {title,content,subject} = inp

    const handleInp=(e)=>{
        const {name,value} = e.target
        setInp({...inp,[name]:value})
    }

    const navigate = useNavigate()

    const createNote=async()=>{
        const token = localStorage.getItem("access-token")
        const {data} = await axios.post("http://localhost:2201/create-note",inp,{
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-type':'application/json'
            }
        })
        console.log(data);
        navigate("/dashboard")
    }

    const handleForm=async(e)=>{
        e.preventDefault()
        createNote()
    }

    return(
        <div className="h-[70%] w-[30%] rounded-[7px] shadow-2xl flex flex-col justify-around items-center bg-slate-50">
            
            <div className="top h-[20%] w-[100%] flex justify-center items-end text-[40px] font-[600] text-blue-700">Please Create a Note !!</div>
           
            <form action="" className="h-[60%] w-[100%] flex justify-start items-center flex-col rounded-[7px] " onSubmit={handleForm} >
                <input type="text" name="title" value={title} placeholder="Enter the Title" className="h-[40px] w-[70%] ps-4 rounded-[3px] border-2 border-gray-200" onChange={handleInp} />
                <br />
                <input type="text" name="content" value={content} placeholder="Enter the Content" className="h-[150px] w-[70%] ps-4 rounded-[3px] border-2 border-gray-200" onChange={handleInp} />
                <br />
                <input type="text" name="subject" value={subject} placeholder="Enter the Subject" className="h-[40px] w-[70%] ps-4 rounded-[3px] border-2 border-gray-200" onChange={handleInp} />
                <br />
                <button className="h-[40px] w-[70%] bg-blue-500 rounded-[3px] text-white" type="submit">Create</button>

            </form>
        </div>
    )
}
export default CreateNote