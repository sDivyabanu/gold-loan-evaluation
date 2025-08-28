import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user from backend (replace with your API)
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/user/${localStorage.getItem("Email")}`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
              Email: `${localStorage.getItem("Email")}`,
              Role: `${localStorage.getItem("Role")}`,
            },
          }
        );
        const data = await res.json();
        setUser(data);
        console.log(data.data[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-white text-black">
        <p className="animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 border border-black">
        {/* Header Section */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold border border-black">
            {user.data[0].FullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.data[0].FullName}</h1>
            <p className="text-sm text-gray-700">{user.data[0].role}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-black"></div>

        {/* User Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-semibold">{user.data[0].Email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-semibold">{user.data[0].PhoneNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Aadhaar</p>
            <p className="font-semibold tracking-wider">{user.data[0].Aadhaar}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Account Created</p>
            <p className="font-semibold">
              {new Date(user.data[0].createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between">
          <button className="px-5 py-2 rounded-lg border border-black hover:bg-black hover:text-white transition">
            Edit Profile
          </button>
          <button className="px-5 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
