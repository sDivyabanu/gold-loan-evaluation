import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null = loading
  const token = localStorage.getItem("token");
  useEffect(() => {
      async function validateToken() {
          
          try {
          console.log(token)
          const res = await fetch("http://localhost:3000/Admin/", {
              headers: {
                  Authorization:token,
                },
            });
            console.log("hello")
            setIsValid(res.ok);
        } catch {
        setIsValid(false);
    }
}

if (token) {
      validateToken();
    } else {
      setIsValid(false);
    }
  }, [token]);
  if (isValid === null) return <div>Loading...</div>;
  if (!isValid) return <Navigate to="/Admin/Login" replace />;

  return children;
};

export default AdminRoute;
