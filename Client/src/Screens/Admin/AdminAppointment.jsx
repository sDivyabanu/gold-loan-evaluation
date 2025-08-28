import React, { useEffect, useState } from "react";
import Cal from "../../assets/Dashboard/Group2.svg"
import list from "../../assets/Dashboard/list.svg"
import clock from "../../assets/Dashboard/clock.svg"
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/AdminSidebar";

function AdminAppointment() {
    const [appointments, setAppointments] = useState([]);


    async function Request() {
        try {
            const r = await fetch('http://localhost:3000/Admin/Appointments', {
                method: "GET",
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                    Email: `${localStorage.getItem('Email')}`,
                    Pass: `${localStorage.getItem('Pass')}`
                }
            });

            if (r.ok) {
                const response = await r.json();
                setAppointments(response.Data);
                console.log("Successfully Fetched the Data", response.Data);
            } else {
                console.log("Error in Fetching Data",r.status);
            }
        } catch (error) {
            console.log("Fetch failed:", error);
        }
    }


    useEffect(() => { Request() }, [])

    async function deleteApp(id) {
        try {
            console.log("Delete request sent ", id)
            const r = await fetch('http://localhost:3000/Admin/Appointments', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem('token')}`,
                    Email: `${localStorage.getItem('Email')}`,
                    Role: `${localStorage.getItem('Role')}`
                },
                body: JSON.stringify({ data: id })
            });

            if (r.ok) {
                const response = await r.json();
                console.log("Successfully Deleted Appointment");
                
                await Request()
                toast.success("Appointment Deleted")

            } else {
                console.log("Error in Deleting");
            }
        } catch (error) {
            console.log("Deletion Failed:", error);
        }
    }
    async function UpdateApp(id) {
        try {
            console.log("Update ", id)
            const r = await fetch('http://localhost:3000/Admin/Appointments', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem('token')}`,
                    Email: `${localStorage.getItem('Email')}`,
                    Role: `${localStorage.getItem('Role')}`
                },
                body: JSON.stringify({ data: id })
            });

            if (r.ok) {
                const response = await r.json();
                console.log("Successfully Updated Appointment");
                console.log(response)
                await Request()

            } else {
                console.log("Error in Updating");
            }
        } catch (error) {
            console.log("Updation Failed:", error);
        }
    }
    return (
        <div className="flex min-h-screen">
            <AdminSidebar></AdminSidebar>
            <div className="w-full h-full flex flex-col">
                <div className="w-full mt-20">
                    <span className="text-3xl ml-20">Appointments</span>
                </div>
                <div>
                    {
                       
                        <>
                        {appointments.map((item,index) =>
                            <div className="bg-white transition-normal py-7 mx-10 mt-10 rounded-2xl border-black border-2" >
                                        <p className="font-bold mb-3 ml-9">Appointment {index+1} </p>
                                        <div className="mb-7 flex justify-around ">
                                            <div className="flex">  <img src={Cal}></img><div className="flex ml-2">{item.AppointmentDate}    </div></div>
                                            <div className="flex "><img src={clock} className="mr-1" ></img> {item.Time} </div>
                                            <div className="flex"><img src={list} className="mr-1"></img>Status: {item.Status} </div>
                                            <button className="text-white, bg-red-600 rounded-md border-none text-white p-1 " onClick={(event) => {
                                                deleteApp(item._id)
                                            }} >Delete</button>
                                            <button className="text-white, bg-green-600 rounded-md border-none  text-white p-1" onClick={(event) => {
                                                UpdateApp(item._id)
                                            }}> Update</button>
                                        </div>
                                        
                            </div>
                                )}

                                    </>
                        
                    }
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default AdminAppointment;
