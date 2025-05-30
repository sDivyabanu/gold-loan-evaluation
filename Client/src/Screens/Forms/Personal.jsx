import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import PageContext from "./PageContext";

export default function Personal() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const value=useContext(PageContext)
    const onSubmit = (data) => {
        console.log("Form Data:", data);
            value.updateFormData(data)

        value.goNext()
        
    };

    return (
        <div className="min-h-screen bg-white text-black flex items-center justify-center">
            <div className="w-full max-w-xl p-8 border border-black rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Personal Details</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">Full Name</label>
                        <input
                            {...register("fullName", { required: "Full Name is required" })}
                            className="w-full border border-black rounded p-2 bg-white text-black"
                        />
                        {errors.fullName && (
                            <p className="text-red-600 text-sm">{errors.fullName.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">Date of Birth</label>
                        <input
                            type="date"
                            {...register("dob", { required: "Date of Birth is required" })}
                            className="w-full border border-black rounded p-2 bg-white text-black"
                        />
                        {errors.dob && (
                            <p className="text-red-600 text-sm">{errors.dob.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">Gender</label>
                        <select
                            {...register("gender", { required: "Gender is required" })}
                            className="w-full border border-black rounded p-2 bg-white text-black"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && (
                            <p className="text-red-600 text-sm">{errors.gender.message}</p>
                        )}
                    </div>


                    <div>
                        <label className="block mb-1 font-semibold">Marital Status</label>
                        <select
                            {...register("marital", { required: "Marital Status is required" })}
                            className="w-full border border-black rounded p-2 bg-white text-black"
                        >
                            <option value="">Select</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                        </select>
                        {errors.marital && (
                            <p className="text-red-600 text-sm">{errors.marital.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Father / Husband's Name </label>
                        <input
                            {...register("father", { required: "Full Name is required" })}
                            className="w-full border border-black rounded p-2 bg-white text-black"
                        />
                        {errors.father && (
                            <p className="text-red-600 text-sm">{errors.father.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">Mobile Number</label>
                        <input
                            type="tel"
                            {...register("mobile", {
                                required: "Mobile number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Enter a valid 10-digit number",
                                },
                            })}
                            className="w-full border border-black rounded p-2 bg-white text-black"
                        />
                        {errors.mobile && (
                            <p className="text-red-600 text-sm">{errors.mobile.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Email ID </label>
                        <input
                            {...register("email", { required: "Email ID is required" })}
                            className="w-full border border-black rounded p-2 bg-white text-black"
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="flex justify-around mt-6 mb-6">
                {value.page>=1 && <button
                    type="button"
                    onClick={() => { value.setPage(value.page - 1) }}
                    className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition"
                >
                    Prev
                </button>}
                 { value.page<=2&& <button
                    type="submit"
                    // onClick={() => { value.setPage(value.page + 1), onSubmit() }}
                    className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition"
                >
                    Next
                </button>}
            </div>
                </form>
            </div>
        </div>
    );
}
