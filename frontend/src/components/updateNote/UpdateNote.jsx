import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateNote=()=>{

    

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

    const handleForm=async(e)=>{
        e.preventDefault()


        const {data} = await axios.put(`http://localhost:2201/update-note/${id}`,inp,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("access-token")}`,
                'Content-Type':'application/json'
            }
        })
        // console.log(data);
        
    }

    const {id} = useParams()



    const updateData=async()=>{
        const {data} = await axios.get(`http://localhost:2201/read-single-note/${id}`,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("access-token")}`,
                'Content-Type':'application/json'
            }
        })    
        console.log(data);
        let {title,content,subject} = data.data                
        setInp({title,content,subject})
        
        
    }

    useEffect(()=>{
        updateData()
    },[])



    return(
        <div className="h-[70%] w-[30%] rounded-[7px] shadow-2xl flex flex-col justify-around items-center bg-slate-50">
            
            <div className="top h-[20%] w-[100%] flex justify-center items-end text-[40px] font-[600] text-blue-700 text-center">Update Your Note !!</div>
           
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
export default UpdateNote