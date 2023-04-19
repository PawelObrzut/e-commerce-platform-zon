import React, { useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import fashion from '../../images/c_fashion.png';
import friday from '../../images/c_friday.png';
import furniture from '../../images/c_furniture.png';
import gameStore from '../../images/c_game-store.png';
import newArrivals from '../../images/c_new-arrivals.png';
import newCollection from '../../images/c_new-collection.png';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselImages = [friday, furniture, gameStore, newArrivals, newCollection, fashion];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? carouselImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === carouselImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const setLink = (index) => {
    switch (index) {
      case 0:
        return "/";
      case 1:
        return "/store/7";
      case 2:
        return "/store/8";
      case 3:
        return "/store/10";
      default:
        return "/productList";
    }
  }

  return (
    <div className="bg-yellow-200 w-full h-[30rem] relative overflow-hidden" >
      <div className="w-full h-full flex transition-all duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {carouselImages.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <Link to={setLink(index)}>
              <img src={image} alt={`carousel image ${index + 1}`} className="w-full h-full object-cover object-top" />
            </Link>
          </div>
        ))}
      </div>
      <div onClick={prevSlide} className="cursor-pointer absolute top-0 left-0 border-2 hover:border-[#358093] border-transparent rounded m-1 w-20 h-60">
        <GrPrevious size={30} className="absolute top-[38%] left-5" />
      </div>
      <div onClick={nextSlide} className="cursor-pointer absolute top-0 right-0 border-2 hover:border-[#358093] border-transparent rounded m-1 w-20 h-60">
        <GrNext size={30} className="absolute top-[38%] right-5" />
      </div>
    </div>
  )
}

export default Carousel;
