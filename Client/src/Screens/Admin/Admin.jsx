import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar.jsx"
const AdminPanel = () => {

  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  

  useEffect(() => {
    async function Request() {

      try {
        const r = await fetch("http://localhost:3000/Admin/upload-pdf", {
          method: "GET",
          headers: {
            authorization: `${localStorage.getItem('token')}`,
            Email: `${localStorage.getItem('Email')}`,
            Pass: `${localStorage.getItem('Pass')}`,
            email2:username
          }
        })
        if (r.ok) {
          const res = await r.json()
        }
      } catch (error) {
        console.log(error)
      }
    }
    Request()
  }, [])
  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", username);

    const response = await fetch("http://localhost:3000/Admin/upload-pdf", {
      method: "POST",
      body: formData,
      headers: {
        authorization: `${localStorage.getItem('token')}`,
        Email: `${localStorage.getItem('Email')}`,
        Pass: `${localStorage.getItem('Pass')}`
      }
    }).then((result) => { console.log(result.json()) });


    const data = response.json()

    alert(data.message);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar></AdminSidebar>
      <div className="flex w-full flex-col items-center p-6  min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Admin Panel - Assign PDFs</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Username"
            className="border p-2"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="file"
            className="border p-2"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <button className="bg-blue-500 text-white p-2 rounded" type="submit" >Upload PDF</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
