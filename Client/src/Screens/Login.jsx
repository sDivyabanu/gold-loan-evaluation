import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const r = await fetch("http://localhost:3000/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await r.json();
      console.log(response);

      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("Email", response.Email);
        localStorage.setItem("Role", response.role);
        toast.success("Successfully logged in!");
         navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in", error);
      toast.error("Error logging in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white border border-black shadow-md rounded-2xl p-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="text"
            {...register("Email", { required: "Email is required" })}
            className="w-full px-4 py-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Email"
          />
          {errors.Email && <p className="text-red-500 text-sm">{errors.Email.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("Pass", { required: "Password is required" })}
            className="w-full px-4 py-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Password"
          />
          {errors.Pass && <p className="text-red-500 text-sm">{errors.Pass.message}</p>}
        </div>
 
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <Link to='/Register'> <div className="flex justify-end text-blue-600" > Register</div></Link> 
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
