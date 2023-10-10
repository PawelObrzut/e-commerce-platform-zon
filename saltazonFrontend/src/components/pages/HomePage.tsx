import React from 'react';
import Card from '../Card/card';
import Carousel from '../Carousel/carousel';
import electronics from '../../../src/images/t_electronics.png';
import youth from '../../../src/images/t_youth.png';
import apple from '../../../src/images/t_apple.png';
import getFit from '../../../src/images/t_get-fit.png';
import books from '../../../src/images/t_books.png';
import shoes from '../../../src/images/t_shoes.png';
import deals from '../../../src/images/t_deals.png';
import easyReturn from '../../../src/images/t_return.png';


const HomePage = () => {
  return (
    <>
      <Carousel />
      <main className='grid grid-cols-3 gap-5 -mt-36 mx-auto w-[98%] z-10 relative lg:grid-cols-4 pb-5'>
        <Card title="Top Deals" img={<img src={deals} alt="deals" />} linkTitle="See all the deals" to="/productList" />
        <Card title="Electronics" img={<img src={electronics} alt="electronics" />} linkTitle="See more" to="/productList" />
        <Card title="Shoes" img={<img src={shoes} alt="shoes" />} linkTitle="Shop now" to="/productList" />
        <Card title="Books" img={<img src={books} alt="books" />} linkTitle="Shop now" to="/productList" />
        <Card title="Get fit at home" img={<img src={getFit} alt="get fit" />} linkTitle="Explore now" to="/productList" />
        <Card title="Youth " img={<img src={youth} alt="youth" />} linkTitle="Shop now" to="/productList" />
        <Card title="Apple " img={<img src={apple} alt="things" />} linkTitle="Shop now" to="/productList" />
        <Card title="Easy Return  " img={<img src={easyReturn} alt="return" />} linkTitle="Learn more" to="/productList" />
      </main>
    </>
  )
}

export default HomePage