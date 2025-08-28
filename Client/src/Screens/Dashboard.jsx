import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Cal from "../assets/Dashboard/Group2.svg";
import Drop from "../assets/Dashboard/mingcute_down-fill.svg";
import list from "../assets/Dashboard/list.svg";
import clock from "../assets/Dashboard/clock.svg";
import pdf1 from "../assets/Dashboard/pdf.svg";
import tick from "../assets/Dashboard/tick.svg";
import cross from "../assets/Dashboard/cross.svg";

function Dashboard() {
  const [drop, toggle] = useState(0);
  const [drop2, toggle2] = useState(0);
  const [drop3, toggle3] = useState(0);

  const [appointments, setAppointments] = useState([]);
  const [goldEvaluations, setGoldEvaluations] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    // Dummy data
    setAppointments([
      {
        AppointmentDate: "2025-06-20",
        Time: "10:30 AM",
        Status: "Confirmed",
      },
      {
        AppointmentDate: "2025-06-25",
        Time: "3:00 PM",
        Status: "Pending",
      },
    ]);

    setGoldEvaluations([
      {
        Id: "G12345",
        Status: "Completed",
      },
      {
        Id: "G12346",
        Status: "In Progress",
      },
    ]);

    setPdfs([
      "/uploads/report1.pdf",
      "/uploads/report2.pdf",
    ]);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow mt-[5rem] ml-[16rem] px-4 sm:px-10">
        <h1 className="text-3xl font-semibold mb-8">My Dashboard</h1>

        <div className="flex flex-col gap-7 w-full max-w-4xl">
          {/* Section 1: Appointments */}
          <div>
            <div
              onClick={() => toggle(drop ? 0 : 1)}
              className={`cursor-pointer bg-black text-white w-full py-4 px-5 rounded-2xl flex justify-between items-center transition-all duration-300 hover:scale-[1.01] ${
                drop && "text-yellow-400"
              }`}
            >
              <span className="text-lg font-medium">
                Upcoming Appointment
              </span>
              <img src={Drop} className="size-4" />
            </div>
            {drop === 1 && (
              <div className="bg-[#D8D8D8] py-6 px-4 rounded-2xl mt-2">
                {appointments.map((item, i) => (
                  <div key={i}>
                    <p className="font-bold mb-3">Appointment Name</p>
                    <div className="flex flex-col sm:flex-row sm:justify-around gap-3 mb-6">
                      <div className="flex items-center">
                        <img src={Cal} alt="" />
                        <span className="ml-2">{item.AppointmentDate}</span>
                      </div>
                      <div className="flex items-center">
                        <img src={clock} className="mr-1" />
                        {item.Time}
                      </div>
                      <div className="flex items-center">
                        <img src={list} className="mr-1" />
                        Status: {item.Status}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-4/5 h-0.5 bg-black rounded-3xl mb-3" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Gold Evaluation */}
          <div>
            <div
              onClick={() => toggle2(drop2 ? 0 : 1)}
              className={`cursor-pointer bg-black text-white w-full py-4 px-5 rounded-2xl flex justify-between items-center transition-all duration-300 hover:scale-[1.01] ${
                drop2 && "text-yellow-400"
              }`}
            >
              <span className="text-lg font-medium">Gold Evaluation Status</span>
              <img src={Drop} className="size-4" />
            </div>
            {drop2 === 1 && (
              <div className="bg-[#D8D8D8] py-6 px-4 rounded-2xl mt-2">
                {goldEvaluations.map((item, i) => (
                  <div key={i}>
                    <div className="flex flex-col sm:flex-row sm:justify-around gap-3 mb-6">
                      <div>Id: {item.Id}</div>
                      <div className="flex items-center">
                        {item.Status === "Completed" ? (
                          <img src={tick} className="mr-2" />
                        ) : (
                          <img src={cross} className="mr-2" />
                        )}
                        Status: {item.Status}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-4/5 h-0.5 bg-black rounded-3xl mb-3" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Reports */}
          <div>
            <div
              onClick={() => toggle3(drop3 ? 0 : 1)}
              className={`cursor-pointer bg-black text-white w-full py-4 px-5 rounded-2xl flex justify-between items-center transition-all duration-300 hover:scale-[1.01] ${
                drop3 && "text-yellow-400"
              }`}
            >
              <span className="text-lg font-medium">Recent Evaluation Reports</span>
              <img src={Drop} className="size-4" />
            </div>
            {drop3 === 1 && (
              <div className="bg-[#D8D8D8] py-6 px-4 rounded-2xl mt-2">
                {pdfs.length === 0 ? (
                  <p>No reports available.</p>
                ) : (
                  pdfs.map((path, i) => (
                    <div key={i}>
                      <p className="mb-3">
                        <a
                          className="flex items-center gap-2 text-black hover:text-blue-500"
                          href={`http://localhost:3000${path}`}
                          download
                        >
                          <img src={pdf1} className="size-6" />
                          Report {i + 1}
                        </a>
                      </p>
                      <div className="flex justify-center">
                        <div className="w-4/5 h-0.5 bg-black rounded-3xl mb-3" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
