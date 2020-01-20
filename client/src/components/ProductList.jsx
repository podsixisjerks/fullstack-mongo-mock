import React from 'react';
import Products from './Products.jsx';
  
const ProductList = (props) => {
   return(
    <div className='product-list'>
      {props.list.map( (item, index) => (
        <Products item={item} key={index} />
      ))}
    </div>
  )
}

export default ProductList;