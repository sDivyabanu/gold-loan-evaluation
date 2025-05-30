import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

function Goldloans() {
    const [appointments, setAppointments] = useState([]);
    
   

    useEffect(() => {
        async function Request() {
            try {
                const r = await fetch('http://localhost:3000/Admin/GoldLoan', {
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
                    console.log("Successfully Fetched the Data",response.Data);
                } else if(r.status==400||r.status==401 || r.status==403) {
                    toast.error("Error Occured. Please Login Once again")
                }
                else{
                    toast.error("Error in fetching the data")
                    
                }
            } catch (error) {
                console.log("Fetch failed:", error);
            }
        }
        Request();
    }, []); 

    return (
        
        <div className="flex min-h-screen">
            <AdminSidebar></AdminSidebar>
            <div className="w-full h-full flex flex-col">
                <div className="w-full mt-20">
                    <span className="text-3xl ml-20">Appointments</span>
                </div>
                    {console.log(ex)}
                <div>
                    {
                        appointments.map((item, key) => (
                            <div key={key} className="w-5xl border-2 py-4 px-8 mt-5 rounded-xl mx-30">
                                <span>{item.user}</span>
                                <button className="text-white, bg-red-600 rounded-md border-none" onClick={(event)=>{
                                    {item}
                                }} >Delete</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}


export default Goldloans;
