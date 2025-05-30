import React from "react";
import Sidebar from "../components/sidebar";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import Calendar from 'react-calendar';
import { useState,useEffect } from "react";
import CalendarGfg from "../components/Calendar";
import { toast } from "react-toastify";



function Appointment(props) {
    const [value, onChange] = useState(new Date());
    
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toDateString();  // Extracts "Fri Mar 14 2025"
    }

    const onSubmit = async (data) => {
        try {
            data["User"] = localStorage.getItem('Email')
            data["Date"] = formatDate(value.toString())
            const r = await fetch("http://localhost:3000/User/Book", {

                method: "POST", headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem('token')}`,
                    Email: `${localStorage.getItem('Email')}`,
                    Role: `${localStorage.getItem('Role')}`
                }, body: JSON.stringify(data)
            })
            const responce = await r.json()
            console.log(responce)
            if (r.ok) {
                toast.success("Successfully booked appointment")
                toast.success("Redirecting to Home Page")
                setTimeout(() => {
                    window.location.href = '/'

                }, 5000)
            }

            else {
                toast.error(responce.message)
            }


        } catch (error) {
            console.log(error)
            toast.error("An Error Occured")
        }


    }


    return (
        <div className="flex min-h-screen">
            <Sidebar></Sidebar>
            <div className="w-full h-full flex flex-col items-center ">
                <div className="w-full mt-10">
                    <span className="text-3xl ml-20 ">Appointment Booking</span>
                </div>

                <div className="bg-[#D8D8D8] w-3/4 h-3/4 rounded-3xl border-2 mt-12 py-9   ">
                    <form onSubmit={handleSubmit(onSubmit)} >

                        <div className="flex justify-around ">
                            <span className="text-xl mb-5">Select Date</span>
                            <span className="text-xl mb-5">Select Time</span>
                        </div>

                        <div className="w-full flex justify-around">
                            <CalendarGfg sendata={onChange} ></CalendarGfg>
                            <input type="time" className="bg-white border-2 rounded-md h-10 mr-21 " {...register("Time", { required: { value: true, message: "This field is required" } })} />
                            {errors.Time && <div className='text-red-300'>{errors.Time.message}</div>}
                        </div>

                        <div className="w-full flex justify-around">
                            <span className="text-xl mt-4">Type of Gold</span>
                            <span className="text-xl mt-4">Extimated Weight</span>
                        </div>

                        <div className="w-full flex justify-around">
                            <input type="text" className="bg-white border-2 rounded-lg mt-2 h-10 w-2xs" {...register("Type", { required: { value: true, message: "This field is required" } })} />
                            {errors.Type && <div className='text-red-300'>{errors.Type.message}</div>}
                            <input type="text" className="bg-white border-2 rounded-lg mt-2 h-10 w-2xs"  {...register("Weight", { required: { value: true, message: "This field is required" } })} />
                            {errors.Weight && <div className='text-red-300'>{errors.Weight.message}</div>}
                        </div>

                        <div className="flex flex-col ml-50  mt-4 ">
                            <span className="text-xl mb-4">Upload Document: </span>
                            <input type="file" className="bg-white w-20 px-2 rounded-md border-2" name="files" for="files" />
                        </div>

                        <div className="flex justify-center">

                            <button type="submit" className="bg-black text-center text-white w-35 py-1 rounded-md" placeholder="">Submit </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Appointment