import React, { createContext, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";


export const GlobalContect = createContext("")

const Root=()=>{

    const [user,SetUser] = useState(null)

    return(
        <div className="root">
            <Navbar/>
            <main className="h-[93vh] w-[100%]  flex items-center justify-center bg-[url(https://c0.wallpaperflare.com/path/130/724/31/black-black-and-white-black-background-blank-28d4495ca096157df917edb0e90c4a89.jpg)] bg-no-repeat bg-cover">
                <Outlet/>
            </main>
        </div>
    )
}
export default Root