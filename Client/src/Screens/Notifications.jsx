import React, { useRef,useEffect } from "react";
import Sidebar from "../components/sidebar";
import { Link } from "react-router-dom";


function Notifications() {

    const Notifications = useRef([])
    async function Request() {
        let r = await fetch('http://localhost:3000/User/Notifications', {
            method: "GET",
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
                Email: `${localStorage.getItem('Email')}`,
                Role: `${localStorage.getItem('Role')}`
            }
        })

        const responce = await r.json()
        responce.map(item => {

            console.log(item.Notification)
        })


        Notifications.current = responce
    }
    Request()
    return (

        <div className="flex min-h-screen">
            <Sidebar></Sidebar>
            <div className="w-full h-full flex flex-col  ">
                <div className="w-full mt-20">
                    <span className="text-3xl ml-20 ">Notifications</span>
                </div>
                <div>

                    <div className="w-4xl border-2 py-4 px-8 mt-5 rounded-xl mx-30">
                        <span>
                           Welcome to our Portal. Any Notifications that you receive will be displayed here
                        </span>
                    </div>

                    {<div>
                        {Notifications.current.map((item, key) =>
                            <>
                                <div className="w-5xl border-2 py-4 px-8 mt-5 rounded-xl mx-30">

                                    <span>
                                        {item.Notification}
                                    </span>
                                </div>
                            </>
                        )
                        }
                    </div>}

                </div>
            </div>
        </div>
    )
}

export default Notifications