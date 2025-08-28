import React from "react";
import Sidebar from "../components/sidebar";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import CalendarGfg from "../components/Calendar";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

function Appointment() {
    const [value, onChange] = useState(new Date());

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toDateString();
    }

    const onSubmit = async (data) => {
        try {
            data["User"] = localStorage.getItem('Email');
            data["Date"] = formatDate(value.toString());

            const r = await fetch("http://localhost:3000/User/Book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem('token')}`,
                    Email: `${localStorage.getItem('Email')}`,
                    Role: `${localStorage.getItem('Role')}`,
                },
                body: JSON.stringify(data),
            });

            const responce = await r.json();

            if (r.ok) {
                toast.success("Successfully booked appointment");
                toast.success("Redirecting to Home Page");
                setTimeout(() => {
                    window.location.href = '/';
                }, 5000);
            } else {
                toast.error(responce.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("An Error Occurred");
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="w-full h-full flex flex-col items-center px-4 md:px-12">
                <div className="w-full mt-20">
                    <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Appointment Booking</h1>
                </div>

                <div className="bg-[#f9f9f9] w-full max-w-5xl rounded-3xl border-2 mt-6 p-6 shadow-lg transition-transform duration-500 ease-in-out hover:scale-[1.01]">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col">
                                <label className="text-lg font-semibold mb-2 block">Select Date</label>
                                <div className="rounded-md p-2 shadow-sm bg-white w-full flex justify-center">
                                    <div className="transform scale-90 md:scale-100 md:ml-6">
                                        <CalendarGfg sendata={onChange} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-lg font-semibold mb-2 block">Select Time</label>
                                <input
                                    type="time"
                                    className="bg-white border-2 rounded-md w-full h-12 px-3 shadow-sm"
                                    {...register("Time", {
                                        required: { value: true, message: "This field is required" },
                                    })}
                                />
                                {errors.Time && <p className="text-red-500 mt-1">{errors.Time.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-lg font-semibold mb-2 block">Type of Gold</label>
                                <input
                                    type="text"
                                    className="bg-white border-2 rounded-md w-full h-12 px-3 shadow-sm"
                                    {...register("Type", {
                                        required: { value: true, message: "This field is required" },
                                    })}
                                />
                                {errors.Type && <p className="text-red-500 mt-1">{errors.Type.message}</p>}
                            </div>

                            <div>
                                <label className="text-lg font-semibold mb-2 block">Estimated Weight</label>
                                <input
                                    type="text"
                                    className="bg-white border-2 rounded-md w-full h-12 px-3 shadow-sm"
                                    {...register("Weight", {
                                        required: { value: true, message: "This field is required" },
                                    })}
                                />
                                {errors.Weight && <p className="text-red-500 mt-1">{errors.Weight.message}</p>}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="text-lg font-semibold mb-2 block">Upload Document:</label>
                            <input
                                type="file"
                                className="bg-white w-full max-w-xs px-3 py-2 rounded-md border-2 shadow-sm"
                                name="files"
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-black hover:bg-gold transition duration-300 text-white px-8 py-3 rounded-md text-lg font-semibold hover:text-yellow-300 hover:shadow-md hover:scale-105"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Appointment;
