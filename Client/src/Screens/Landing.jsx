import React from "react";
import Home from "../assets/Landing/Home.svg"
import Contact from "../assets/Landing/Contact.svg"
import phone from "../assets/Landing/phone-outline.svg"
import mail from "../assets/Landing/material-symbols_mail-outline.svg"
import { Link } from "react-router-dom";
import imag from "../assets/Comments/Frame 4.svg"
import { useState,useEffect } from "react";

function Landing() {
   
    function Signout() {
        localStorage.clear()
        window.location.href = "/Login"
    }
    return (
        
        <div className="relative">
                    <div className="Nav  h-14 bg-black text-white flex justify-between items-center" >
                <div className="nav-left">
                    <img src={Home} className="size-6 ml-2"></img>
                    
                </div>
                {localStorage.getItem('Role')==="USER"?
                <div className="nav-right font-Afacad flex gap-12">
                    <Link to="/Book" ><div>Book Appointment</div></Link>
                    <Link to="/Dashboard" ><div>My Dashboard</div></Link>
                    <div>Contact Us</div>
                    {localStorage.length != null && <div onClick={() => { Signout() }} className="cursor-pointer" >Signout</div>}
                    <img src={Contact} className="size-6 mr-2"></img>
                </div>:
                <div className="nav-right font-Afacad flex gap-12">
                    <Link to="/Admin/Appointment" ><div>All Appointment</div></Link>
                    <Link to="/Admin/loan" ><div>Loan Application</div></Link>
                    <div>Contact Us</div>
                    {localStorage.length != null && <div onClick={() => { Signout() }} className="cursor-pointer" >Signout</div>}
                    <img src={Contact} className="size-6 mr-2"></img>
                </div>}
            </div>

            <div className="Main">
                <div className="Top-text flex flex-col items-center gap-6 ">
                    <p className="text-4xl font-Fraunces mt-10 ">Get your Gold evaluated with Trust And Transparency</p>
                    <span className="text-3xl">“Book an appointment today and get your gold professioally evaluated”</span>
                    <Link to="/Book" > <button className="px-12 py-3 text-white rounded-xl bg-black">Book an Appointment</button></Link>
                </div>

            </div>

            <div>
                <span className="text-3xl ml-16" >How it Works ?</span>
            </div>

            {/* This div contains the how it works and customer reviews */}
            <div className="flex">
                <div className="w-1/2 mt-6 ml-20" >

                    <div className="flex">
                        <div className="bg-black size-16 rounded-full text-white text-center text-3xl py-3 ">
                           1
                        </div>
                        <div className="flex flex-col ml-3">

                            <span className="text-2xl">
                                Apply for a loan
                            </span>
                            <span className="text-slate-500">
                                Visit  your bank and apply for a loan
                            </span>
                        </div>
                    </div>
                    <div className="bg-black w-0.5 h-32 ml-8 " >
                        .
                    </div>
                    <div className="flex">
                        <div className="bg-black size-16 rounded-full text-white text-center text-3xl py-3 ">
                           2
                        </div>
                        <div className="flex flex-col ml-3">

                            <span className="text-2xl">
                               Book an Appointment
                            </span>
                            <span className="text-slate-500">
                                Schedule your gold evaluation online
                            </span>
                        </div>
                    </div>
                    <div className="bg-black w-0.5 h-32 ml-8 " >
                        .
                    </div>
                    <div className="flex">
                        <div className="bg-black size-16 rounded-full text-white text-center text-3xl py-3 ">
                           3
                        </div>
                        <div className="flex flex-col ml-3">

                            <span className="text-2xl">
                                Gold Evaluation
                            </span>
                            <span className="text-slate-500">
                                Bring your gold to us for evaluation
                            </span>
                        </div>
                    </div>
                    <div className="bg-black w-0.5 h-32 ml-8 " >
                        .
                    </div>
                    <div className="flex">
                        <div className="bg-black size-16 rounded-full text-white text-center text-3xl py-3 ">
                           4
                        </div>
                        <div className="flex flex-col ml-3">

                            <span className="text-2xl">
                               View Evaluation
                            </span>
                            <span className="text-slate-500">
                                See the estimated value on your dashboard
                            </span>
                        </div>
                    </div>
                    <div className="bg-black w-0.5 h-32 ml-8 " >
                        .
                    </div>
                    <div className="flex">
                        <div className="bg-black size-16 rounded-full text-white text-center text-3xl py-3 ">
                           5
                        </div>
                        <div className="flex flex-col ml-3">

                            <span className="text-2xl">
                              Accept or Reject
                            </span>
                            <span className="text-slate-500">
                                Decide if you accept the value
                            </span>
                        </div>
                    </div>
                    <div className="bg-black w-0.5 h-32 ml-8 " >
                        .
                    </div>
                    <div className="flex">
                        <div className="bg-black size-16 rounded-full text-white text-center text-3xl py-3 ">
                           5
                        </div>
                        <div className="flex flex-col ml-3">

                            <span className="text-2xl">
                                Apply for a loan
                            </span>
                            <span className="text-slate-500">
                                Visit  your bank and apply for a loan
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 bg-[#D8D8D8] flex h-[65rem] flex-col  items-center rounded-3xl mr-10 ">
                    <span className="text-3xl mt-5">
                        Customer Review
                    </span>
                    <div className="w-3/4 h-full flex flex-col mt-10 gap-3 overflow-auto mb-10"  >
                        <img src={imag} className=""></img>
                        <img src={imag} className=""></img>
                        <img src={imag} className=""></img>
                        <img src={imag} className=""></img>
                        <img src={imag} className=""></img>
                        <img src={imag} className=""></img>
                        <img src={imag} className=""></img>
                        <img src={imag} className=""></img>
                        <img src={imag} className=""></img>
                        <img src={imag} className=""></img>
                        <img src={imag} className=""></img>
                        {/* <img src={imag} className=""></img> */}
                        
                    </div>
                </div>
            </div>

            <div className="Footer h-55 bg-black absolute mt-10 right-0 left-0 " >
                <div className="text-white flex justify-evenly my-5 font-Afacad text-md">
                    <span>About Us</span>
                    <span>|</span>
                    <span>FAQ's</span>
                    <span>|</span>
                    <span>Terms & Conditions</span>
                    <span>|</span>
                    <span>Privacy Policy</span>
                </div>
                <div className="Phone-number flex justify-center">
                    <div className="flex text-white gap-10 mt-4 " >
                        <div className="flex items-center gap-3">
                            <img src={phone} className="size-4 mt-0.5"></img>
                            <span>+91 9899045677</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <img src={phone} className="size-4 mt-0.5" ></img>
                            <span>+91 9899045677</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <img src={phone} className="size-4 mt-0.5"></img>
                            <span>+91 9899045677</span>
                        </div>
                    </div>
                </div>
                <div className="mail flex items-center justify-center mt-5 gap-2 text-white">
                    <img src={mail} className="size-4 mt-1"></img>
                    <span>helloworld123@gmail.com</span>
                </div>
                <div className="flex text-white justify-center mt-5 text-sm">
                    <span>Copyrights © 2025 nameeeeeeee. All rights reserved.</span>
                </div>
            </div>
        </div>
    )
}

export default Landing;