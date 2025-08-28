import Sidebar from "../../components/sidebar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/AdminSidebar";

function Loans() {
    
    const [data, setdata] = useState([])
    const [files, setfiles] = useState([])
    const[forward,setForward]=useState(true)
    const { id } = useParams()
    async function Request() {
        try {
            const r = await fetch(`http://localhost:3000/Admin/loan/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                    Email: `${localStorage.getItem('Email')}`,
                    Role: `${localStorage.getItem('Role')}`
                }
            });

            const response = await r.json();
            console.log(response)
            if (r.ok) {
                setdata(response.Data)
                setfiles(response.files)
                if(!response.files){setForward(false)}

                toast.success("Successfully Fetched the Data");
            } else {
                
                toast.error("Error in Fetching Data");
            }
        } catch (error) {
            toast.error("Fetch Failed")
            console.log("Fetch failed:", error);
        }
    }
    useEffect(() => {

        Request()
    }, [])

    async function Forward(Email) {
        try {
            const r = await fetch(`http://localhost:3000/Admin/loan/${id}/forward`, {
                method: "GET",
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                    Email: `${localStorage.getItem('Email')}`,
                   Role: `${localStorage.getItem('Role')}`
                }
            });

            if (r.ok) {
                const response = await r.json();
                toast.success("Successfully Forwarded");
            } else {
                toast.error("Error in Forwarding Data");
            }
        } catch (error) {
            console.log("Forward failed:", error);
        }
        
    }

    const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-medium">{value}</p>
  </div>);
    return (
        <div className="flex min-h-screen" >
        
            <AdminSidebar></AdminSidebar>
            <div className="w-full bg-gray-100 flex items-center justify-center p-6">
                <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl">
                    <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">Loan Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
                        <Detail label="Full Name" value={data.Fullname} />
                        <Detail label="Date of Birth" value={new Date(data.DateOfBirth).toLocaleDateString()} />
                        <Detail label="Gender" value={data.Gender} />
                        <Detail label="Marital Status" value={data.Marital} />
                        <Detail label="Father's Name" value={data.Father} />
                        <Detail label="Mobile" value={data.Mobile} />
                        <Detail label="Email" value={data.Email} />
                        <Detail label="Current Address" value={data.CurrentAdd} />
                        <Detail label="Permanent Address" value={data.PermAdd} />
                        <Detail label="City" value={data.City} />
                        <Detail label="State" value={data.State} />
                        <Detail label="Pincode" value={data.Pincode} />
                        <Detail label="Bank" value={data.Bank} />
                        <Detail label="Gold Type" value={data.GoldType} />
                        <Detail label="Weight" value={data.Weight + ' gm'} />
                        <Detail label="Purity" value={data.Purity + '%'} />
                        <Detail label="Loan ID" value={data.LoanID} />
                    </div>
                    <div className="mt-4">
                        <span className="text-sm text-gray-500 ">Reports</span>
                        <div>
                        {files?
                            files.map((item,index)=>(
                                <div>
                                
                                <a href={"http://localhost:3000/uploads/Loan/"+data.Email+"/"+item} className="text-lg font-medium " download><p>Report {index+1} </p></a>
                                </div>
                            )):
                            <div>No Reports Exist</div>
                        }
                        </div>
                    </div>
                    <div className="flex justify-center">


                    {files?
                    <button className=" bg-green-500 text-white p-1 px-2 rounded-md cursor-pointer" onClick={()=>{
                        Forward(data.Email)
                    }}> Forward to Bank</button>:<div>Cant forward without reports</div>
                } 
                
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Loans
