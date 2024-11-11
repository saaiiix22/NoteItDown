import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Note from "../04_note/Note";
import { useNavigate } from "react-router-dom";

const Dashboard=()=>{

    const [card,setCard] = useState(null)

    const [refresh,setRefresh] = useState(false)

    const readNote=async()=>{
        const token = localStorage.getItem("access-token")
        const {data} = await axios.get("http://localhost:2201/read-note",{
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json',
            }
        })
        // console.log(data.data);
        setCard(data.data)
        setRefresh(!refresh)
    }

    const navigate = useNavigate()

    useEffect(()=>{
        readNote()
    },[refresh])

    return(
        <>
            {card?.map((i,index)=>{
                return(
                    <Fragment key={index}>
                        <Note props={i}/>
                    </Fragment>
                )
            })}
            <button onClick={()=>{navigate("/create-note")}}>Add Note</button>
        </>
    )
}
export default Dashboard