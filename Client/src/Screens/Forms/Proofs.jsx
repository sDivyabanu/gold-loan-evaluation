import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import PageContext from "./PageContext";

export default function Proofs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const value=useContext(PageContext)
  const onSubmit = (data) => {
    console.log("Uploaded Files:", data);
        value.updateFormData(data)

    value.goNext()
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center">
      <div className="w-full max-w-xl p-8 border border-black rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Proofs</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold">ID Proof (Aadhaar/PAN)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              {...register("idProof", { required: "ID proof is required" })}
              className="w-full border border-black rounded p-2 bg-white text-black"
            />
            {errors.idProof && (
              <p className="text-red-600 text-sm">{errors.idProof.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Address Proof (Utility Bill, Aadhaar)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              {...register("addressProof", { required: "Address proof is required" })}
              className="w-full border border-black rounded p-2 bg-white text-black"
            />
            {errors.addressProof && (
              <p className="text-red-600 text-sm">{errors.addressProof.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Income Proof (Bank Statement / Salary Slip)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              {...register("incomeProof", { required: "Income proof is required" })}
              className="w-full border border-black rounded p-2 bg-white text-black"
            />
            {errors.incomeProof && (
              <p className="text-red-600 text-sm">{errors.incomeProof.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold">Select Bank</label>
            <select
              {...register("selectedBank", { required: "Please select a bank" })}
              className="w-full border border-black rounded p-2 bg-white text-black"
            >
              <option value="">-- Choose a Bank --</option>
              <option value="SBI">State Bank of India (SBI)</option>
              <option value="HDFC">HDFC Bank</option>
              <option value="ICICI">ICICI Bank</option>
              <option value="Axis">Axis Bank</option>
              <option value="PNB">Punjab National Bank</option>
              <option value="BOB">Bank of Baroda</option>
            </select>
            {errors.selectedBank && (
              <p className="text-red-600 text-sm">{errors.selectedBank.message}</p>
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
