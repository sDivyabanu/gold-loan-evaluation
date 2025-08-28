import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import AdminSidebar from "../../components/AdminSidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Lucide Icons
import {
  User,
  Phone,
  Mail,
  Gem,
  Scale,
  Percent,
  Calendar,
  FileText,
  Home,
  Building2,
  BadgeCheck,
  Image as ImageIcon,
  ShieldCheck,
  BadgeDollarSign,
  CheckCircle2,
  Ruler,
} from "lucide-react";

const GoldEvaluation = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm();

  const [files, setFiles] = useState({});
  const [reportData, setReportData] = useState(null);
  const reportRef = useRef(null);

  const handleFileChange = (event, key) => {
    const newFiles = { ...files, [key]: event.target.files[0] };
    setFiles(newFiles);
  };

  const onSubmit = (data) => {
    data.files = files;
    setReportData(data);
    // small delay to ensure images render before PDF if user clicks immediately
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  // Robust, crisp, multi-page PDF
const downloadPDF = async () => {
  const input = document.getElementById("report-section");
  if (!input) return;

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Convert section to canvas
  const canvas = await html2canvas(input, {
    scale: 2,
    useCORS: true, // ✅ allows local image rendering
  });

  const imgData = canvas.toDataURL("image/png");
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Extra pages
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("Gold_Evaluation_Report.pdf");
};


  // Helper: Input with icon (keeps your color focus styles)
  const InputWithIcon = ({ icon: Icon, placeholder, type = "text", name, options }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <input
        type={type}
        {...register(name, options)}
        placeholder={placeholder}
        className="block w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-yellow-600 focus:ring-yellow-600"
      />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white text-black">
      <AdminSidebar />

      <div className="p-6 mx-auto w-full max-w-5xl">
        {!reportData ? (
          // ===================== FORM (no loan fields) =====================
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-white p-8 rounded-3xl shadow-lg border border-gray-200 animate-fade-in-up"
          >
            <div className="text-center mb-2">
              <div className="mx-auto w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center border border-yellow-200">
                <Gem className="text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-yellow-600 mt-3">Gold Evaluation Form</h2>
              <p className="text-gray-500 text-sm">Enter details to generate a professional appraisal report</p>
            </div>

            {/* Evaluator & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-4">
              <div>
                <h3 className="font-semibold text-yellow-600 mb-2 flex items-center gap-2">
                  <ShieldCheck size={18} /> Certified Evaluator
                </h3>
                <InputWithIcon icon={User} placeholder="Evaluator Name" name="evaluatorName" options={{ required: true }} />
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <InputWithIcon icon={BadgeCheck} placeholder="License / ID" name="evaluatorLicense" />
                  <InputWithIcon icon={Calendar} placeholder="Report Date" type="date" name="reportDate" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-600 mb-2 flex items-center gap-2">
                  <Building2 size={18} /> Evaluation Service
                </h3>
                <InputWithIcon icon={Home} placeholder="Company Name" name="companyName" />
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <InputWithIcon icon={Phone} placeholder="Phone" name="companyPhone" />
                  <InputWithIcon icon={Mail} placeholder="Email" type="email" name="companyEmail" />
                </div>
                <InputWithIcon icon={Home} placeholder="Address" name="companyAddress" />
              </div>
            </div>

            {/* Client */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
              <div>
                <h3 className="font-semibold text-yellow-600 mb-2">Client Information</h3>
                <InputWithIcon icon={User} placeholder="Client Name" name="clientName" options={{ required: true }} />
                <InputWithIcon icon={Home} placeholder="Address" name="clientAddress" />
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <InputWithIcon icon={Phone} placeholder="Phone" name="clientPhone" />
                  <InputWithIcon icon={Mail} placeholder="Email" type="email" name="clientEmail" />
                </div>
              </div>
              <div>
                <label className="font-semibold text-gray-600 flex items-center gap-2 mb-1">
                  <ImageIcon size={18} /> Client Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "clientPhoto")}
                  className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
                />
              </div>
            </div>

            {/* Item Photography */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <h3 className="font-semibold text-yellow-600 mb-2 flex items-center gap-2">
                <ImageIcon size={18} /> Item Photography & Documentation
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  ["frontView", "Front View"],
                  ["sideProfile", "Side Profile"],
                  ["hallmark", "Hallmark Detail"],
                  ["weightProof", "Weight Verification"],
                ].map(([key, label]) => (
                  <label key={key} className="h-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-sm text-gray-500 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, key)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* Detailed Item Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <h3 className="font-semibold text-yellow-600 mb-2">Basic Information</h3>
                <InputWithIcon icon={Gem} placeholder="Item Type (e.g., Gold Necklace)" name="itemType" />
                <InputWithIcon icon={FileText} placeholder="Description" name="description" />
                <InputWithIcon icon={Building2} placeholder="Manufacturer (e.g., Tiffany & Co.)" name="manufacturer" />
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <InputWithIcon icon={Calendar} placeholder="Year Made" type="number" name="yearMade" />
                  <InputWithIcon icon={BadgeCheck} placeholder="Serial Number" name="serialNumber" />
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <h3 className="font-semibold text-yellow-600 mb-2">Technical Specifications</h3>
                <InputWithIcon icon={Scale} placeholder="Weight (g)" type="number" name="weight" />
                <InputWithIcon icon={Percent} placeholder="Purity (e.g., 18K / 750)" name="purity" />
                <InputWithIcon icon={Ruler} placeholder="Dimensions (e.g., 18 in length, 3mm width)" name="dimensions" />
                <InputWithIcon icon={CheckCircle2} placeholder="Condition (e.g., Excellent)" name="condition" />
                <InputWithIcon icon={BadgeCheck} placeholder="Hallmarks (e.g., 750, Italy)" name="hallmarks" />
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <h3 className="font-semibold text-yellow-600 mb-2">Additional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <InputWithIcon icon={Gem} placeholder="Gemstones (e.g., 0.25ct VS1)" name="gemstones" />
                <InputWithIcon icon={FileText} placeholder="Craftsmanship" name="craftsmanship" />
                <InputWithIcon icon={FileText} placeholder="Rarity" name="rarity" />
                <InputWithIcon icon={FileText} placeholder="Historical Significance" name="history" />
              </div>
            </div>

            {/* Market & Pricing */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
              <h3 className="font-semibold text-yellow-600 mb-2 flex items-center gap-2">
                <BadgeDollarSign size={18} /> Market Valuation & Pricing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <InputWithIcon icon={Scale} placeholder="Current Gold Price / gram" type="number" name="pricePerGram" />
                <InputWithIcon icon={FileText} placeholder="Melt Value" type="number" name="meltValue" />
                <InputWithIcon icon={FileText} placeholder="Premium Value" type="number" name="premiumValue" />
                <InputWithIcon icon={FileText} placeholder="Insurance Value" type="number" name="insuranceValue" />
                <InputWithIcon icon={FileText} placeholder="Retail Value" type="number" name="retailValue" />
                <InputWithIcon icon={FileText} placeholder="Primary Evaluation Value" type="number" name="primaryValue" />
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <h3 className="font-semibold text-yellow-600 mb-2">Notes</h3>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                <textarea
                  {...register("notes")}
                  placeholder="Any additional notes / disclaimers"
                  className="block w-full p-3 pl-10 border border-gray-300 rounded-lg focus:border-yellow-600"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 px-8 py-3 bg-yellow-600 text-white font-bold rounded-full shadow-md hover:scale-105 transition-transform hover:bg-yellow-500"
              >
                Generate Report
              </button>
            </div>
          </form>
        ) : (
          // ===================== REPORT =====================
          <div
            ref={reportRef}
            id="report-section"
            className="bg-white p-10 rounded-3xl shadow-lg border border-gray-200 animate-fade-in-up"
            style={{ width: "210mm", minHeight: "297mm", margin: "auto" }} // A4 styling
          >
            {/* Header */}
            <div className="text-center pb-4 mb-6 border-b-2 border-yellow-600">
              <div className="mx-auto w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center border border-yellow-200 mb-2">
                <Gem className="text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-yellow-600">GOLD EVALUATION REPORT</h2>
              <div className="mt-2 flex items-center justify-center gap-3 text-xs">
                <span className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200">Report #{Date.now()}</span>
                <span className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200">
                  {reportData.reportDate || new Date().toISOString().slice(0, 10)}
                </span>
              </div>
            </div>

            {/* Evaluator & Company */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
              <h3 className="font-semibold text-yellow-600 mb-3">Certified Evaluator Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-lg font-semibold">{reportData.evaluatorName}</p>
                  <p className="text-sm text-gray-600">License: {reportData.evaluatorLicense || "—"}</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs border border-green-200">
                    Certified Professional
                  </span>
                </div>
                <div className="text-sm">
                  <p className="font-semibold">{reportData.companyName}</p>
                  <p>{reportData.companyAddress}</p>
                  <p>Phone: {reportData.companyPhone}</p>
                  <p>Email: {reportData.companyEmail}</p>
                </div>
              </div>
            </div>

            {/* Client */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
              <h3 className="font-semibold text-yellow-600 mb-3">Client Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-sm">
                  <p className="text-lg font-semibold">{reportData.clientName}</p>
                  <p className="text-gray-600">{reportData.clientAddress}</p>
                  <p>{reportData.clientPhone}</p>
                  <p>{reportData.clientEmail}</p>
                </div>
                {files.clientPhoto && (
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-2">Client Photo</div>
                    <img
                      src={URL.createObjectURL(files.clientPhoto)}
                      alt="Client"
                      className="w-40 h-40 object-cover border rounded-lg mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Item Photography */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
              <h3 className="font-semibold text-yellow-600 mb-3">Item Photography & Documentation</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  ["frontView", "Front View"],
                  ["sideProfile", "Side Profile"],
                  ["hallmark", "Hallmark Detail"],
                  ["weightProof", "Weight Verification"],
                ].map(([key, label]) => (
                  <div key={key} className="text-center">
                    <div className="h-32 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                      {files[key] ? (
                        <img src={URL.createObjectURL(files[key])} alt={label} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-sm text-gray-400">{label}</span>
                      )}
                    </div>
                    <div className="text-xs mt-1 text-gray-600">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Item Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <h3 className="font-semibold text-yellow-600 mb-3">Basic Information</h3>
                <div className="text-sm grid grid-cols-3 gap-y-2">
                  <div className="text-gray-600">Item Type:</div>
                  <div className="col-span-2 font-medium">{reportData.itemType}</div>

                  <div className="text-gray-600">Description:</div>
                  <div className="col-span-2 font-medium">{reportData.description}</div>

                  <div className="text-gray-600">Manufacturer:</div>
                  <div className="col-span-2 font-medium">{reportData.manufacturer}</div>

                  <div className="text-gray-600">Year Made:</div>
                  <div className="col-span-2 font-medium">{reportData.yearMade}</div>

                  <div className="text-gray-600">Serial Number:</div>
                  <div className="col-span-2 font-medium">{reportData.serialNumber}</div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <h3 className="font-semibold text-yellow-600 mb-3">Technical Specifications</h3>
                <div className="text-sm grid grid-cols-3 gap-y-2">
                  <div className="text-gray-600">Weight:</div>
                  <div className="col-span-2 font-semibold text-yellow-600">{reportData.weight || "—"} g</div>

                  <div className="text-gray-600">Purity:</div>
                  <div className="col-span-2 font-medium">{reportData.purity}</div>

                  <div className="text-gray-600">Dimensions:</div>
                  <div className="col-span-2 font-medium">{reportData.dimensions}</div>

                  <div className="text-gray-600">Condition:</div>
                  <div className="col-span-2">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs border border-green-200">
                      {reportData.condition || "—"}
                    </span>
                  </div>

                  <div className="text-gray-600">Hallmarks:</div>
                  <div className="col-span-2 font-medium">{reportData.hallmarks}</div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
              <h3 className="font-semibold text-yellow-600 mb-3">Additional Details</h3>
              <div className="text-sm grid grid-cols-6 gap-y-2">
                <div className="text-gray-600 col-span-1">Gemstones:</div>
                <div className="col-span-2 font-medium">{reportData.gemstones}</div>
                <div className="text-gray-600 col-span-1">Rarity:</div>
                <div className="col-span-2 font-medium">{reportData.rarity}</div>

                <div className="text-gray-600 col-span-1">Craftsmanship:</div>
                <div className="col-span-2 font-medium">{reportData.craftsmanship}</div>
                <div className="text-gray-600 col-span-1">Significance:</div>
                <div className="col-span-2 font-medium">{reportData.history}</div>
              </div>
            </div>

            {/* Testing Methods */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
              <h3 className="font-semibold text-yellow-600 mb-3">Testing Methods & Verification</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                {[
                  "Electronic Gold Tester",
                  "Acid Test",
                  "X-Ray Fluorescence (XRF)",
                  "Visual Inspection",
                  "Magnetic Test",
                  "Density Test",
                ].map((label) => (
                  <div key={label} className="flex items-center gap-2 rounded-xl bg-green-50 text-green-700 border border-green-200 px-3 py-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-600"></span>
                    {label}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-xl p-3">
                <b>Testing Confidence:</b> All tests confirm the authenticity and purity of the gold item. Results are consistent across multiple testing methods.
              </div>
            </div>

            {/* Market Valuation */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
              <h3 className="font-semibold text-yellow-600 mb-3">Market Valuation & Pricing Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="rounded-2xl bg-yellow-50 border border-yellow-200 p-4">
                  <div className="text-xs text-gray-500">Current Gold Prices</div>
                  <div className="mt-1">
                    <div className="text-sm">Per Gram</div>
                    <div className="text-2xl font-bold text-yellow-600">{reportData.pricePerGram || "—"}</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4">
                  <div className="text-xs text-gray-500">Base Values</div>
                  <div className="mt-1 grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-sm">Melt Value</div>
                      <div className="text-xl font-bold">{reportData.meltValue || "—"}</div>
                    </div>
                    <div>
                      <div className="text-sm">Premium Value</div>
                      <div className="text-xl font-bold">{reportData.premiumValue || "—"}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-green-50 border border-green-200 p-4">
                  <div className="text-xs text-gray-500">Market Values</div>
                  <div className="mt-1 grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-sm">Insurance</div>
                      <div className="text-xl font-bold">{reportData.insuranceValue || "—"}</div>
                    </div>
                    <div>
                      <div className="text-sm">Retail</div>
                      <div className="text-xl font-bold">{reportData.retailValue || "—"}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Value */}
              <div className="mt-6 rounded-2xl bg-yellow-50 border border-yellow-200 p-6 text-center">
                <div className="text-sm text-gray-600">Primary Evaluation Value</div>
                <div className="text-4xl font-extrabold text-yellow-600">
                  {reportData.primaryValue ? Number(reportData.primaryValue).toLocaleString() : "—"}
                </div>
                <div className="text-xs text-gray-600 mt-2">Based on current market conditions, item specifications, and professional assessment</div>
                <div className="mt-2 inline-block text-xs px-3 py-1 rounded-full bg-yellow-100 border border-yellow-200">
                  Valid for 30 days from report date
                </div>
              </div>
            </div>

            {/* Notes & Signature */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
              <h3 className="font-semibold text-yellow-600 mb-3">Professional Certification & Important Notes</h3>
              <div className="text-sm text-gray-700">
                <p className="font-semibold">Evaluator Certification</p>
                <p className="text-gray-600">
                  This evaluation has been conducted by a certified precious metals appraiser in accordance with industry standards and best practices.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-2 text-gray-600 list-disc list-inside">
                  <li>This evaluation is valid for 30 days from the date of issue</li>
                  <li>Values may vary based on market conditions and buyer preferences</li>
                  <li>Retail values may vary significantly between different markets</li>
                  <li>This report is for evaluation purposes and not a guarantee of sale price</li>
                </ul>
              </div>

              <div className="mt-4 rounded-xl bg-yellow-50 border border-yellow-200 p-3 text-sm text-gray-700">
                <b>Market Conditions Notice:</b> Gold prices are subject to daily fluctuations based on economic conditions, exchange rates, and market demand.
              </div>

              <div className="mt-6 text-center">
                <div className="h-24 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center text-gray-400">
                  Digital Signature &amp; Seal
                </div>
                <div className="mt-2 text-sm">
                  Digitally signed and certified by <b>{reportData.evaluatorName || "—"}</b>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Report generated on {reportData.reportDate || new Date().toISOString().slice(0, 10)} | Valid for 30 days
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-4 text-xs text-gray-500 border-t pt-3">
              <p>© Gold Evaluation Services</p>
            </div>
          </div>
        )}

        {/* Actions */}
        {reportData && (
          <div className="text-center mt-8 flex items-center justify-center gap-3">
            <button
              onClick={downloadPDF}
              className="px-8 py-3 bg-yellow-600 text-white font-bold rounded-full shadow-md hover:scale-105 transition-transform hover:bg-yellow-500"
            >
              Download PDF
            </button>
            <button
              onClick={() => window.print()}
              className="px-8 py-3 bg-gray-900 text-white font-bold rounded-full shadow-md hover:scale-105 transition-transform"
            >
              Print Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoldEvaluation;
