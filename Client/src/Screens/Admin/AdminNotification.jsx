import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/AdminSidebar'

const AdminNotification = () => {
  const [user, setUser] = useState([])
  const [username, setUsername] = useState("")
  const [notification, setNotification] = useState("")

  useEffect(() => {
    async function Request() {
      try {
        const r = await fetch("http://localhost:3000/Admin/get-user", {
          method: "GET",
          headers: {
            authorization: `${localStorage.getItem('token')}`,
            Email: `${localStorage.getItem('Email')}`,
            Pass: `${localStorage.getItem('Pass')}`,
          }
        })

        const res = await r.json()
        setUser(res.data || [])   // make sure it's always an array
      } catch (error) {
        console.log(error)
      }
    }
    Request()
  }, [])

  const handleUpload = async (e) => {
  e.preventDefault();

  if (!username) {
    alert("Please select a user before submitting");
    return;
  }

  try {
    
    const response = await fetch("http://localhost:3000/Admin/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",   
        authorization: `${localStorage.getItem('token')}`,
        Email: `${localStorage.getItem('Email')}`,
        Pass: `${localStorage.getItem('Pass')}`
      },
      body: JSON.stringify({ username: username, message: notification })
    });

    const data = await response.json();
    alert(data.message);
  } catch (err) {
    console.error("Upload failed", err);
  }
};


  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex w-full flex-col items-center p-6 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Admin Panel - Send Notification</h2>
        <form onSubmit={handleUpload} className="space-y-4">

          {/* Select User */}
          <select 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">-- Select User --</option>
            {user.map((item, key) => (
              <option key={key} value={item.Email}>{item.Email}</option>
            ))}
          </select>

          {/* Upload File */}
          <input 
            type="text" 
            onChange={(e) => setNotification(e.target.value)} 
            className="border p-2 rounded"
            placeholder='Enter the Message'
          />

          <button className="bg-blue-500 text-white p-2 rounded" type="submit">
            Send Notification
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminNotification
