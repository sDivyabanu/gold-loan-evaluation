import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("Pass");
 
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/Auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Successfully registered!");
        setTimeout(() => {
          window.location.href = "/Login";
        }, 1000);
      } else {
        const errData = await response.json();
        if(errData.code==11000){
          
          Object.entries(errData.key).map(([key,value])=>{
            toast.error(`${key} already exist`);
          })
        }
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-white px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white text-black border border-black shadow-xl rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-black">Register</h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Full Name</label>
          <input
            type="text"
            {...register("FullName", { required: "Full name is required" })}
            className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="John Doe"
            autoComplete="name"
          />
          {errors.FullName && <p className="text-red-500 text-sm mt-1">{errors.FullName.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Phone Number</label>
          <input
            type="text"
            {...register("PhoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be exactly 10 digits",
              },
            })}
            className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="9876543210"
            autoComplete="tel"
          />
          {errors.PhoneNumber && <p className="text-red-500 text-sm mt-1">{errors.PhoneNumber.message}</p>}
        </div>

        {/* Aadhaar */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Aadhaar</label>
          <input
            type="text"
            {...register("Aadhaar", {
              required: "Aadhaar is required",
              pattern: {
                value: /^[0-9]{12}$/,
                message: "Aadhaar must be exactly 12 digits",
              },
            })}
            className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="123412341234"
            autoComplete="off"
          />
          {errors.Aadhaar && <p className="text-red-500 text-sm mt-1">{errors.Aadhaar.message}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="text"
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="email@example.com"
            autoComplete="email"
          />
          {errors.Email && <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            {...register("Pass", { required: "Password is required" })}
            className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="••••••••"
            autoComplete="new-password"
          />
          {errors.Pass && <p className="text-red-500 text-sm mt-1">{errors.Pass.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Confirm Password</label>
          <input
            type="password"
            {...register("ConPass", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="••••••••"
            autoComplete="new-password"
          />
          {errors.ConPass && <p className="text-red-500 text-sm mt-1">{errors.ConPass.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition duration-200 disabled:opacity-50"
        >
          {isSubmitting ? "Registering..." : "Submit"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Register;
