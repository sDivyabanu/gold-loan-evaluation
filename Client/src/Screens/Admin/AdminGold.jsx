import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import AdminSidebar from "../../components/AdminSidebar";



const MultiFileForm = () => {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const onSubmit = async (data) => {
    const submissionData = new FormData();

    submissionData.append("username", data.username);
    submissionData.append("typeOfGold", data.typeOfGold);
    submissionData.append("weight", data.weight);
    submissionData.append("marketValue", data.marketValue);
    submissionData.append("officerName", data.officerName);
    submissionData.append("evaluationDate", data.evaluationDate);
    submissionData.append("remarks", data.remarks);
    files.forEach((file) => {
      submissionData.append("files", file);
    });
    console.log(submissionData)

    try {
      const response = await fetch("http://localhost:3000/Admin/GoldEvaluation", {
        method: "POST",
        headers: {
          authorization: `${localStorage.getItem("token")}`,
          Email: `${localStorage.getItem("Email")}`,
          Pass: `${localStorage.getItem("Pass")}`,
        },
        body: submissionData,
      });
      console.log(response)

      if (response.ok) {
        alert("Form submitted successfully");
      } else if (r.status == 400 || r.status == 401 || r.status == 403) {
        toast.error("Error Occured. Please Login Once again")
        window.location.href('/Admin/Login')
      } else {
        alert("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred");
    }
  };

  return (
  <div className="flex min-h-screen">
    <AdminSidebar></AdminSidebar>
    <div className="p-4 border my-auto  rounded-lg shadow-md w-96 mx-auto text-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


        <input type="text" {...register("username", { required: "This field is required" })} placeholder="User Name" className="block w-full p-2 border rounded" />
        {errors.username && <div className='text-red-300'>{errors.username.message}</div>}

        <input type="text" {...register("typeOfGold", { required: "This field is required" })} placeholder="Type Of Gold" className="block w-full p-2 border rounded" />
        {errors.typeOfGold && <div className='text-red-300'>{errors.typeOfGold.message}</div>}

        <input type="number" {...register("weight", { required: "This field is required" })} placeholder="Weight" className="block w-full p-2 border rounded" />
        {errors.weight && <div className='text-red-300'>{errors.weight.message}</div>}

        <input type="text" {...register("marketValue", { required: "This field is required" })} placeholder="Market Value" className="block w-full p-2 border rounded" />
        {errors.marketValue && <div className='text-red-300'>{errors.marketValue.message}</div>}

        <input type="text" {...register("officerName", { required: "This field is required" })} placeholder="Officer Name" className="block w-full p-2 border rounded" />
        {errors.officerName && <div className='text-red-300'>{errors.officerName.message}</div>}

        <input type="text" {...register("evaluationDate", { required: "This field is required" })} placeholder="Evaluation Date" className="block w-full p-2 border rounded" />
        {errors.evaluationDate && <div className='text-red-300'>{errors.evaluationDate.message}</div>}

        <input type="text" {...register("remarks")} placeholder="Remarks" className="block w-full p-2 border rounded" />

        <input type='file' multiple onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />

        <button type="submit" disabled={isSubmitting} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Submit Form</button>
      </form>
    </div>
    </div>
  );
};

export default MultiFileForm;
