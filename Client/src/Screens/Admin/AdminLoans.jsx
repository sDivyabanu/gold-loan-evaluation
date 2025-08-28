import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

function AdminLoans() {
    const navigate = useNavigate();

    const [loans, setloans] = useState([]);
    async function Request() {
        try {
            const r = await fetch('http://localhost:3000/Admin/loan', {
                method: "GET",
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                    Email: `${localStorage.getItem('Email')}`,
                    Pass: `${localStorage.getItem('Pass')}`
                }
            });

            if (r.ok) {
                const response = await r.json();
                setloans(response.Data);
                console.log(loans)
                console.log("Successfully Fetched the Data", response.Data);
            } else {
                console.log("Error in Fetching Data");
            }
        } catch (error) {
            console.log("Fetch failed:", error);
        }
    }


    useEffect(() => { Request() }, [])

    // async function deleteApp(id) {
    //     try {
    //         console.log("Delete request sent ", id)
    //         const r = await fetch('http://localhost:3000/Admin/Appointments', {
    //             method: "DELETE",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `${localStorage.getItem('token')}`,
    //                 Email: `${localStorage.getItem('Email')}`,
    //                 Pass: `${localStorage.getItem('Pass')}`
    //             },
    //             body: JSON.stringify({ data: id })
    //         });

    //         if (r.ok) {
    //             const response = await r.json();
    //             console.log("Successfully Deleted Appointment");
    //             await Request()

    //         } else {
    //             console.log("Error in Deleting");
    //         }
    //     } catch (error) {
    //         console.log("Deletion Failed:", error);
    //     }
    // }
    async function View(id) {
        try {

            navigate(`/Admin/loan/${id}`);

        } catch (error) {
            console.log("Updation Failed:", error);
        }
    }
    return (
        <div className="flex min-h-screen">
            <AdminSidebar></AdminSidebar>
            <div className="w-full h-full flex flex-col">
                <div className="w-full mt-20">
                    <span className="text-3xl ml-20">Loan Applications</span>
                </div>
                <div>
                   
                            < >
                                {loans.map((key,index) =>
                                    <div className="bg-white transition-normal py-7 mx-10 mt-10 rounded-2xl border-black border-2">
                                        <p className="font-bold mb-3 ml-9">Loan Application {index+1} </p>
                                        <div className="mb-7 flex justify-around ">
                                            <div className="flex">  <div className="flex ml-2"> <b>Loan ID : </b>{key.LoanID}    </div></div>
                                            <div className="flex "><b>Name : </b> {key.Fullname} </div>
                                            <div className="flex"> <b>Mobile : </b> {key.Mobile} </div>
                                            <div className="flex"> <b>Email : </b> {key.Email} </div>
                                            <button className="text-white, bg-red-600 rounded-md border-none text-white p-1 " onClick={(event) => {
                                                deleteApp(key._id)
                                            }} >Delete</button>
                                            <button className="text-white, bg-green-600 rounded-md border-none  text-white p-1" onClick={(event) => {
                                                View(key._id)
                                            }}> View</button>
                                        </div>

                                    </div>
                                )}

                            </>
                        
                </div>
            </div>
        </div>
    );
}

export default AdminLoans;
