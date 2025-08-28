import React from "react";
import { useState } from "react";
import Menu from "../assets/Dashboard/ic_baseline-menu.svg"
import Frame from "../assets/Dashboard/Frame.svg"
import Frame1 from "../assets/Dashboard/Frame(1).svg"
import Measure from "../assets/Dashboard/lsicon_measure-filled.svg"
import Notification from "../assets/Dashboard/material-symbols_notifications.svg"
import Booking from "../assets/Dashboard/material-symbols_support.svg"
import { Link } from "react-router-dom";

function AdminSidebar() {

    const [toggle, settoggle] = useState(true)
    return (
        <>
            <div className={`sidebar flex  transition-all ${toggle ? "w-80" : "w-10 overflow-hidden"}  bg-black `}  >
                <div className=" w-6 h-1/2 my-10 ml-2 flex flex-col gap-10 text-white size-6 " >
                    <a className="flex gap-2" onClick={() => { settoggle(!toggle) }}><img src={Menu}  ></img> Menu</a>
                    <Link to='/Admin/Appointment'> <div className="flex gap-2 w-3xl"> <img src={Booking}></img> Appointments </div> </Link>
                    <Link to='/'> <div className="flex gap-2 w-3xl"> <img src={Booking}></img> Home </div> </Link>
                   <Link to="/Admin/Upload"> <div className="flex gap-2 w-3xl "><img src={Frame}></img>Upload Report</div></Link>
                   <Link to="/Admin/GoldEvaluation" ><div className="flex gap-2 w-3xl"><img src={Measure}></img>Gold Valuation</div></Link>
                    <Link to='/Admin/Notifications' ><div className="flex gap-2 w-3xl"><img src={Notification}></img>Notifications </div></Link>
                    <Link to='/Admin/Loan'> <div className="flex gap-2 w-3xl"> <img src={Booking}></img>Loans </div> </Link>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar