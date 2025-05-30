import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import PageContext from "./PageContext";

export default function GoldDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const value=useContext(PageContext)
  const onSubmit = (data) => {
    console.log("Gold Details:", data);
     value.updateFormData(data)
    value.handleFinalSubmit()
    
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center">
      <div className="w-full max-w-xl p-8 border border-black rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Gold Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold">Gold Type (Ornament, Coin, Bar)</label>
            <input
              type="text"
              {...register("goldType", { required: "Gold type is required" })}
              className="w-full border border-black rounded p-2 bg-white text-black"
              placeholder="e.g., Ornament"
            />
            {errors.goldType && (
              <p className="text-red-600 text-sm">{errors.goldType.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Gold Weight (grams)</label>
            <input
              type="number"
              step="0.01"
              {...register("goldWeight", { required: "Gold weight is required" })}
              className="w-full border border-black rounded p-2 bg-white text-black"
              placeholder="e.g., 50.75"
            />
            {errors.goldWeight && (
              <p className="text-red-600 text-sm">{errors.goldWeight.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Purity (in Karats)</label>
            <input
              type="number"
              {...register("goldPurity", { required: "Gold purity is required" })}
              className="w-full border border-black rounded p-2 bg-white text-black"
              placeholder="e.g., 22"
            />
            {errors.goldPurity && (
              <p className="text-red-600 text-sm">{errors.goldPurity.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Gold Evaluation Report</label>
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              {...register("evaluationReports", { required: "Gold evaluation report is required" })}
              className="w-full border border-black rounded p-2 bg-white text-black"
            />
            {errors.evaluationReports && (
              <p className="text-red-600 text-sm">{errors.evaluationReports.message}</p>
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
                 { <button

                    type="submit"
                    className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition"
                >
                    Submit
                </button>}
            </div>

          
        </form>
      </div>
    </div>
  );
}
