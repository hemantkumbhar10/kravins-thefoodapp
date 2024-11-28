import React, { useRef, useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type CarouselPropTypes = {
  postImgs: string[];
  isDropped: boolean;
};

const Carousel: React.FC<CarouselPropTypes> = ({ postImgs, isDropped }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const refs: React.RefObject<HTMLDivElement>[] = postImgs.map(() =>
    useRef<HTMLDivElement>(null),
  );

  const scrollToImage = (index: number) => {
    if (refs[index].current) {
      refs[index].current?.scrollIntoView({
        behavior: "smooth",
        block: 'nearest'
      });
    }
  };

  const totalImages = postImgs.length;

  const nextImage = () => {
    const nextIndex = (currentImage + 1) % totalImages;
    scrollToImage(nextIndex);
    setCurrentImage(nextIndex);
  };

  const previousImage = () => {
    const prevIndex = currentImage === 0 ? totalImages - 1 : currentImage - 1;
    scrollToImage(prevIndex);
    setCurrentImage(prevIndex);
  };

  return (
    <>
      <div
        className={`w-full absolute select-none flex flex-row ${isDropped && "overflow-x-scroll snap-x snap-mandatory"}`}
      >
        {postImgs.map((url, i) => {
          return (
            <div
              className={`w-full snap-start flex-shrink-0 flex justify-center items-center bg-black`}
              key={url}
              ref={refs[i]}
            >
              <img
                src={url}
                alt="post first image"
                className={`w-full ${!isDropped ? "object-cover" : "object-contain"} h-80`}
              />
              <div
                className={`absolute inset-0 bg-gray-700 opacity-0 rounded-md transition-opacity duration-1000 ease-out ${!isDropped && " opacity-40"}`}
              ></div>
            </div>
          );
        })}
      </div>

      {isDropped && (
        <div className="absolute w-full flex flex-row justify-between items-center px-8">
          <div
            role="button"
            aria-label="Navigate to Previous Image"
            className="w-10 h-10 rounded-full bg-gray-50 opacity-35 flex justify-center items-center"
            onClick={previousImage}
          >
            <FaChevronLeft className="text-xl" />
          </div>
          <div
            role="button"
            aria-label="Navigate to Next Image"
            className="w-10 h-10 rounded-full bg-gray-50 opacity-35 flex justify-center items-center"
            onClick={nextImage}
          >
            <FaChevronRight className="text-xl" />
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
