import React, { useEffect, useState } from "react";
import Cal from "../assets/Dashboard/Group2.svg"
import list from "../assets/Dashboard/list.svg"
import clock from "../assets/Dashboard/clock.svg"


function UserAppointment() {
    useEffect(() => {
  async function checkAccess() {
    try {
      const value=useContext(context)
      if (!value.User) {
        window.location.href='/Login'; // not authorized
      }
    } catch {
      window.location.href='/Login'; // not authorized
     
    }
  }
  checkAccess();
}, []);
    const [appointments, setAppointments] = useState([]);
    async function Request() {
        try {
            const r = await fetch('http://localhost:3000/User/Appointments', {
                method: "GET",
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                    Email: `${localStorage.getItem('Email')}`,
                    Role: `${localStorage.getItem('Role')}`
                }
            });

            if (r.ok) {
                const response = await r.json();
                setAppointments(response);
                console.log("Successfully Fetched the Data", response.Data);
            } else {
                console.log("Error in Fetching Data");
            }
        } catch (error) {
            console.log("Fetch failed:", error);
        }
    }
    console.log("hellooo")
    useEffect(() => { Request() }, [])

    return (
        <div className="flex min-h-screen">
            <div className="w-full h-full flex flex-col">
                <div className="w-full mt-20">
                    <span className="text-3xl ml-20">My Appointments</span>
                </div>
                <div>
                    <div className="bg-white transition-normal py-7 mx-10 mt-10 rounded-2xl border-black border-2" >
                        
                            <>
                                <p className="font-bold mb-3 ml-9">Appointment Name </p>
                                <div className="mb-7 flex justify-around ">
                                    <div className="flex">  <img src={Cal}></img><div className="flex ml-2">{item.AppointmentDate}    </div></div>
                                    <div className="flex "><img src={clock} className="mr-1" ></img> {item.Time} </div>
                                    <div className="flex"><img src={list} className="mr-1"></img>Status: {item.Status} </div>

                                </div>
                            </>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserAppointment;
