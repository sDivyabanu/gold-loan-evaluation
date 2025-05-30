import React, { useState,useEffect } from "react"
import { useForm } from "react-hook-form";
import Address from "./Forms/Address";
import Proofs from "./Forms/Proofs";
import Personal from "./Forms/Personal";
import GoldDetails from "./Forms/GoldDetails";
import PageContext from "./Forms/PageContext";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Sidebar from "../components/sidebar";


function Loan() {
  
  const [page, setPage] = useState(0)
    const goNext=()=>{
        setPage(page+1)
    }
    const [formData, setFormData] = useState({});

    const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

   const handleFinalSubmit = async () => {
    console.log(formData)
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof FileList) {
        Array.from(value).forEach((file, index) =>
          payload.append(`${key}[${index}]`, file)
        );
      } else {
        payload.append(key, value);
      }
    });

{console.log(payload)}
    try {
      const res = await fetch("http://localhost:3000/User/Loan/LoanApplication", {
        method: "POST",
        headers:{
          Authorization: `${localStorage.getItem('token')}`,
                Email: `${localStorage.getItem('Email')}`,
                Role: `${localStorage.getItem('Role')}`
        },
        body: payload
      });

      if (res.ok) {
        toast.success("Loan Application Successfull")
        toast.success("Redirecting to home page")
        setTimeout(()=>{
          window.location.href='/'
        },4000)

      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    }
  };

    const returnPage = () => {
        if (page == 0) {
            return <Personal></Personal>
        }
        else if(page==1){
            return <Address></Address>
        }
        else if (page == 2) {
            return <Proofs></Proofs>
        }
        else if (page == 3) {
            return <GoldDetails></GoldDetails>
        }
    }
    return (
        <>
        <PageContext.Provider value={{page,setPage,goNext,updateFormData,handleFinalSubmit  }} > 
          <div  className="flex min-h-screen">
          <Sidebar></Sidebar>
          <div className="w-full">

            {returnPage()}
          </div>
          </div>

        </PageContext.Provider>
        <ToastContainer/>
        </>
    )
}

export default Loan;