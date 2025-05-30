import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import PageContext from "./PageContext";

export default function Address() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const value=useContext(PageContext);
  const onSubmit = (data) => {
    console.log("Address Data:", data);
    value.updateFormData(data)
    value.goNext()
  };
  return (

    <div className="min-h-screen bg-white text-black flex items-center justify-center">
        
      <div className="w-full max-w-xl p-8 border border-black rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Address Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Current Address</label>
            <textarea
              {...register("currentAddress", { required: "Current address is required" })}
              className="w-full border border-black rounded p-2 bg-white text-black"
              rows={3}
            />
            {errors.currentAddress && (
              <p className="text-red-600 text-sm">{errors.currentAddress.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Permanent Address</label>
            <textarea
              {...register("permanentAddress", { required: "Permanent address is required" })}
              className="w-full border border-black rounded p-2 bg-white text-black"
              rows={3}
            />
            {errors.permanentAddress && (
              <p className="text-red-600 text-sm">{errors.permanentAddress.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">City</label>
            <input
              {...register("city", { required: "City is required" })}
              className="w-full border border-black rounded p-2 bg-white text-black"
            />
            {errors.city && (
              <p className="text-red-600 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">State</label>
            <input
              {...register("state", { required: "State is required" })}
              className="w-full border border-black rounded p-2 bg-white text-black"
            />
            {errors.state && (
              <p className="text-red-600 text-sm">{errors.state.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Pincode</label>
            <input
              type="text"
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Enter a valid 6-digit pincode",
                },
              })}
              className="w-full border border-black rounded p-2 bg-white text-black"
            />
            {errors.pincode && (
              <p className="text-red-600 text-sm">{errors.pincode.message}</p>
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
