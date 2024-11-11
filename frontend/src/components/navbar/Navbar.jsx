import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar=()=>{

    const navigate = useNavigate()

    const logUser = localStorage.getItem("name")

    const logout=()=>{
        localStorage.clear()
        navigate("/login")
    }

    return(
        <nav className="h-16 w-100 bg-white-50 shadow-md flex items-center justify-center">
            <div className="left h-[100%] w-[50%] flex items-center justify-start ps-5 font-[600] text-[30px]">
                <h1 onClick={()=>{navigate("/")}}>NoteItDown.</h1>
            </div>
            <div className="right h-[100%] w-[50%] flex items-center justify-end pe-4">
                <div>{logUser?<div className="h-[40px] w-[40px] flex items-center justify-center border-2 cursor-pointer rounded-full font-[600] hover:bg-red-300 me-5">{logUser[0].toUpperCase()}</div>:""}</div>
                {logUser?<button className="h-[50%] w-[10%] bg-blue-500 rounded-[3px] text-white" onClick={logout}>Logout</button>:<button className="h-[50%] w-[10%] bg-blue-500 rounded-[3px] text-white" onClick={()=>{navigate("/login")}}>Login</button>}
                

            </div>
        </nav>
    )
}
export default Navbar