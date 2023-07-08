import React, { useState, useEffect } from "react";

function SlideshowComponent() {
  const [currentImage, setCurrentImage] = useState("/headerPanel.png");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentImage((oldImage) =>
          oldImage === "/headerPanel.png"
            ? "/HeaderPanel2.png"
            : "/headerPanel.png"
        );
        setIsVisible(true);
      }, 2000);
    }, 9000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center lg:px-0 bg-gradient-to-t from-green-300 to-white-500">
        <img
          className={`object-contain max-h-64 mx-auto h-full w-full lg:max-h-64 lg:mx-0 ${
            isVisible ? "animate-fade-in" : "animate-fade-out"
          }`}
          src={currentImage}
          alt="header panel"
        />
      </div>
    </div>
  );
}

export default SlideshowComponent;
