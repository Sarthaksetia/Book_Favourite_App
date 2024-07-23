import React from "react";
import ImageFallback from "../assets/images.png";

type ImageTypes = {
  src: HTMLImageElement["src"];
  alt: HTMLImageElement["alt"];
  className: string;
};
const Image = ({ src, alt, className = "" }: ImageTypes) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = ImageFallback;
  };

  return (
    <img
      src={src || ImageFallback}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default Image;
