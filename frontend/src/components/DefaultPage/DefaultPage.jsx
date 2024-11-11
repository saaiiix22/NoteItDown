import React from "react";
import {useTypewriter, Cursor} from "react-simple-typewriter"

const DefaultPage=()=>{

    const [text] = useTypewriter({
        words:['Improvise', 'Adapt', 'Overcome'],
        loop:{},
    })

    return(
        <div className="h-[100%] w-[100%] flex justify-center items-center text-[60px] font-[600] font-sans text-blue-800">
            <h1 className="text-start">Welcome to NoteItDown !!
                <br />
                <span className="text-slate-950"> {text}</span>
                <Cursor/>
            </h1>

        </div>
    )
}
export default DefaultPage