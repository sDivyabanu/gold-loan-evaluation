import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  async function Request() {
    try {
      let r = await fetch("http://localhost:3000/User/Notifications", {
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          Email: `${localStorage.getItem("Email")}`,
          Role: `${localStorage.getItem("Role")}`,
        },
      });

      const response = await r.json();
      console.log("Fetched notifications:", response);

      setNotifications(response); // ✅ updates state -> UI re-renders
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  }

  useEffect(() => {
    Request(); // ✅ only runs once when component loads
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full h-full flex flex-col">
        <div className="w-full mt-20">
          <span className="text-3xl ml-20">Notifications</span>
        </div>
        <div>
          <div className="w-4xl border-2 py-4 px-8 mt-5 rounded-xl mx-30">
            <span>
              Welcome to our Portal. Any Notifications that you receive will be
              displayed here
            </span>
          </div>

          <div>
            {notifications.map((item, key) => (
              <div
                key={key}
                className="w-5xl border-2 py-4 px-8 mt-5 rounded-xl mx-30"
              >
                <span>{item.Notification}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
