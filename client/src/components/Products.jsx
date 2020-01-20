import React from 'react';
  
const Products = (props) => {
  const{ _id, item, curr_bid, ends_in, image } = props.item;
   return(
    <div className='product-list-entry'>
      <img className="listimages" src={image} ></img>
      <div className="product-list-entry-title">{item}
      <br></br>
      <br></br>
        <div className="product-list-entry-detail">
          <span> Current Bid: {curr_bid} </span>
          <br></br>
          <span> Bidding Ends In: {ends_in} </span>
        </div>
      </div>
    </div>
  );
}

export default Products;