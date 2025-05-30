import React, { useState } from 'react';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirst = currentIndex === 0;
    setCurrentIndex(isFirst ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    const isLast = currentIndex === images.length - 1;
    setCurrentIndex(isLast ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500">No images to display</p>;
  }

  const imageUrl = "http://localhost:3000/" + images[currentIndex];
  console.log(imageUrl)

  return (
    <div className="w-md mx-auto mt-8">
      <div className="relative flex items-center justify-center h-[300px] rounded-xl overflow-hidden shadow-lg">
        <button
          onClick={goToPrevious}
          className="absolute left-2 text-4xl text-white bg-black bg-opacity-30 rounded-full p-1 hover:bg-opacity-50 z-10"
        >
          ❮
        </button>

        <div
          className="w-full h-full bg-center bg-no-repeat  duration-500 bg-contain"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>

        <button
          onClick={goToNext}
          className="absolute right-2 text-4xl text-white bg-black bg-opacity-30 rounded-full p-1 hover:bg-opacity-50 z-10"
        >
          ❯
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
            }  `}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
