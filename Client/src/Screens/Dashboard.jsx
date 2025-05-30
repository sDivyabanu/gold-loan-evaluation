import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Cal from "../assets/Dashboard/Group2.svg"
import Drop from "../assets/Dashboard/mingcute_down-fill.svg"
import list from "../assets/Dashboard/list.svg"
import clock from "../assets/Dashboard/clock.svg"
import pdf1 from "../assets/Dashboard/pdf.svg"

import tick from "../assets/Dashboard/tick.svg"
import cross from "../assets/Dashboard/cross.svg"

function Dashboard() {
    const [drop, toggle] = useState(0)
    const [drop2, toggle2] = useState(0)
    const [drop3, toggle3] = useState(0)
    const App = useRef([])
    const pdf = useRef([])


    async function Request() {

        let r = await fetch('http://localhost:3000/User/Dashboard', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
                Email: `${localStorage.getItem('Email')}`,
                Role: `${localStorage.getItem('Role')}`
            }
        }
        )

        const responce = await r.json()
        App.current = responce
        console.log(responce)
    }

    async function Reports() {

        let r = await fetch(`http://localhost:3000/User/user-pdfs/${localStorage.getItem('Email')}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
                Email: `${localStorage.getItem('Email')}`,
                Pass: `${localStorage.getItem('Pass')}`
            }
        }
        ).then()
        // console.log(r)
        let data = await r.json()
        console.log("This is data", data)

        pdf.current = data

    }

    Request()
    Reports()
    return (
        <div className="flex min-h-screen">
            <Sidebar></Sidebar>
            <div className="w-full h-full flex  flex-col ">
                <div className="w-full mt-20">
                    <span className="text-3xl ml-20 ">My Dashboard</span>
                </div>

                <div className="flex h-3/4 flex-col gap-7 w-2/3 ml-50 mt-6 " >
                    <div>
                        <div onClick={() => {
                            if (drop == 0) {
                                toggle(1)

                            }
                            else {
                                toggle(0)
                            }
                        }} className=" mt-10 bg-black text-white w-full py-4 rounded-2xl text-center flex items-center justify-between ">
                            <span className="ml-7">Upcoming Appointment</span>

                            <img src={Drop} className="size-4 mr-3"  ></img>
                        </div>
                        {drop == 1 &&
                            <div className="bg-[#D8D8D8] transition-normal py-7 rounded-2xl" >
                                {App.current.appointments.map(item =>
                                    <>
                                        <p className="font-bold mb-3 ml-9">Appointment Name </p>
                                        <div className="mb-7 flex justify-around ">
                                            <div className="flex">  <img src={Cal}></img><div className="flex ml-2">{item.AppointmentDate}    </div></div>
                                            <div className="flex "><img src={clock} className="mr-1" ></img> {item.Time} </div>
                                            <div className="flex"><img src={list} className="mr-1"></img>Status: {item.Status} </div>
                                        </div>
                                        <div className="flex justify-center ">

                                            <div className="w-4/5 h-0.5 border-1 bg-black mb-3 rounded-3xl" ></div>
                                        </div>
                                    </>
                                )}

                            </div>
                        }
                    </div>
                    <div>
                        <div onClick={() => {
                            if (drop2 == 0) {
                                toggle2(1)

                            }
                            else {
                                toggle2(0)
                            }
                        }} className="bg-black text-white w-full py-4 rounded-2xl text-center flex items-center justify-between ">
                            <span className="ml-7">Gold Evalutaion Status</span>
                            <img src={Drop} className="size-4 mr-3" ></img>
                        </div>
                        {drop2 == 1 &&
                            <div className="bg-[#D8D8D8] transition-normal py-7 rounded-2xl">
                                {
                                    App.current.goldEvalutions != undefined &&
                                    App.current.goldEvalutions.map(item =>
                                        <>
                                            <div className="mb-7 flex justify-around ">
                                                <div className="flex">Id:{item.Id}  </div>
                                                <div className="flex">{item.Status == 'Completed' ? <img src={tick} className="mr-2" ></img> : <img src={cross} className="mr-2" ></img>}Status: {item.Status} </div>
                                            </div>
                                            <div className="flex justify-center ">
                                                <div className="w-4/5 h-0.5 border-1 bg-black mb-3 rounded-3xl" ></div>
                                            </div>
                                        </>
                                    )}


                            </div>
                        }
                    </div>

                    <div>
                        <div onClick={() => {
                            if (drop3 == 0) {
                                toggle3(1)

                            }
                            else {
                                toggle3(0)
                            }
                        }} className="bg-black text-white w-full py-4 rounded-2xl text-center flex items-center justify-between ">
                            <span className="ml-7">Recent Evaluation Reports</span>
                            <img src={Drop} className="size-4 mr-3" >
                            </img>
                        </div>
                        {console.log(pdf.current.length)}
                        {drop3 == 1 &&

                            <div className="bg-[#D8D8D8] transition-normal py-7 rounded-2xl">
                                {pdf.current.message == "No PDFs found for this user" ? <div className="ml-5"> No Reports available for this user yet </div> : pdf.current['pdfs'].map((item, index) =>
                                    <>
                                        <p className="mb-3" ><a className="ml-30 flex" href={"http://localhost:3000" + item} download ><img src={pdf1} className="size-7"></img>  Report {index + 1} </a></p>
                                        <div className="flex justify-center ">
                                            <div className="w-4/5 h-0.5 border-1 bg-black mb-3 rounded-3xl" ></div>
                                        </div>
                                    </>
                                )
                                }

                            </div>
                        }
                    </div>
                    

                </div>

            </div>
        </div>
    )
}

export default Dashboard