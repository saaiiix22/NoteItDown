import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Note=({props})=>{

    // console.log(props);
   
    let {title,content,subject} = props
    
    const delNote = async(_id) =>{
        const {data} = await axios.delete(`http://localhost:2201/delete-note/${_id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("access-token")}`,
            }
        })
    }

  


    const navigate = useNavigate()

    

    return(
        <div className="h-[30%] w-[15%] bg-slate-200 flex items-center justify-center flex-col me-5">
            <h2 className="text-[20px] font-[600]">{title}</h2>
            <p className="text-[12px] text-center">{content}</p>
            <p className="text-[18px] text-center">{subject}</p>
            <button className="h-[10%] w-[30%] bg-red-500 rounded" onClick={()=>{delNote(props._id)}}>Delete</button>
            <button className="h-[10%] w-[30%] bg-slate-500 mt-4 rounded" onClick={()=>{navigate(`/update-note/${props._id}`)}}>Update</button>
        </div>
    )
}
export default Note