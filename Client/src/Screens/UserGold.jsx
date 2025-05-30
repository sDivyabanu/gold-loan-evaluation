import { useEffect, useState } from "react";
import { useRef } from "react";
import ImageSlider from "../components/ImageSlider";
import Sidebar from "../components/sidebar";


function UserGold() {
  const [images, setImages] = useState([]);
  const jeweldata = useRef()
  
  useEffect(() => {
    async function Request() {
      try {
        const res = await fetch("http://localhost:3000/User/GoldEvaluation", {
          headers: {
            Authorization: localStorage.getItem("token"),
            Email: localStorage.getItem("Email"),
            Role: `${localStorage.getItem('Role')}`
          },
        });

        const data = await res.json();



        if (Array.isArray(data.Image)) {
          jeweldata.current = data.data
          setImages(data.Image); // ✅ Set state here
        } else {
          console.warn("Image data is not an array");
          setImages([]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
      console.log(jeweldata.current[0])

    }

    Request();
  }, []); 

  return (
    <div className="flex min-h-screen justify-items-center">
      <Sidebar></Sidebar>
      <div className="p-4">
        <h2 className="text-3xl text-center mb-7">Gold Valuation Status</h2>

        {images.length === 0 ? (
          <p className="text-center text-gray-500">No images available</p>
        ) : (
          images.map((img, index) => <div className="flex mb-6" >
            <ImageSlider images={img} />
            {console.log(jeweldata.current[index])}
            <div className="bg-[#D8D8D8] w-3xl rounded-2xl ml-10 border-2 flex justify-around">
              <div className="flex flex-col  mt-3 gap-9 font-bold" >
                <div className="flex gap-3">
                  <span>Type of Gold :</span> 
                  <div className="font-normal">{jeweldata.current[index]==undefined?" Optional comments from the evaluator":jeweldata.current[index].typeOfGold}</div>
                </div>
                <div className="flex gap-3">
                  <span>Weight :</span>
                  <div className="font-normal">{jeweldata.current[index]==undefined?" Optional comments from the evaluator":jeweldata.current[index].weight} </div>
                </div>
                <div className="flex gap-3">
                  <span>Estimated Market Value : </span>
                  <div className="font-normal">{jeweldata.current[index]==undefined?" Optional comments from the evaluator":jeweldata.current[index].marketValue} </div>
                </div>
                <div className="flex gap-3">
                  <span>Officers Name : </span>
                  <div className="font-normal">{jeweldata.current[index]==undefined?" Optional comments from the evaluator":jeweldata.current[index].officerName} </div>
                </div>
                <div className="flex gap-3">
                  <span>Evaluation Date :</span>
                  <div className="font-normal">{jeweldata.current[index]==undefined?" ":jeweldata.current[index].evaluationDate} </div>

                </div>

              </div>
              <div className="font-bold flex gap-2  mt-3">
                <span>Remarks: </span>
                <div className="font-normal w-40">{jeweldata.current[index]==undefined?" Optional comments from the evaluator":jeweldata.current[index].remarks} </div>
                </div>
            </div>
          </div>)
        )}
      </div>
    </div>
  );
}

export default UserGold;
