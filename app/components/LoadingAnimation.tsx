import React from "react";
import Animation from "./Animation";
const LoadingAnimation = () => {
  return (
    <div className="w-full h-full min-h-screen absolute top-0 left-0 z-[1000] bg-white flex items-center justify-center">
      <Animation border={false} />
      <div className="loader"></div>
    </div>
  );
};

export default LoadingAnimation;
