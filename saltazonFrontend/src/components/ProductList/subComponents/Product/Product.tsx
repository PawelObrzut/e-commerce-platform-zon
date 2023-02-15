import './Product.css';

const Product = () => {
  return (
    <article className="product">
      <img className="product--photo__img" src="https://3.bp.blogspot.com/-eDeTttUjHxI/WVSvmI-552I/AAAAAAAAAKw/0T3LN6jABKMyEkTRUUQMFxpe6PLvtcMMwCPcBGAYYCw/s1600/001-culture-clash-matthew-gianoulis.jpg" alt="Product" />
        <div className="product--cathegory">
          <span>Shoes</span>
        </div>
        <h3 className="product--title">My face not my heart</h3>
        <p className="product--description">Description Product tell me how to change playlist height size like 600px in html5 player. player good work now check this link</p>
        <div className="product--footer">
          <div className="product--price"><span>Rp500.000</span></div>
          <div className="product--addToBasket"><span>Add to basket</span></div>
        </div>
    </article>
  )
}

export default Product