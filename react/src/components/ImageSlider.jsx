import React, { useEffect, useState } from 'react'
const ImageSlider = ({images}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentImage,setCurrentImage]=useState(null);
console.log(images[currentImageIndex].id);
    useEffect(() => {
      // Automatically slide every 3 seconds
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        
      }, 5000);
  
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [images.length]);
  return (
    <div className="">
    
    <img className="w-[200px] transition-all object-cover h-[200px] delay-100 shadow rounded-md " src={`${images[currentImageIndex].url}`} alt={`Image ${currentImageIndex}`} 
      
    />
   
  </div>
  )
}

export default ImageSlider