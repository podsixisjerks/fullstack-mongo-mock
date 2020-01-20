import React from 'react';

export default class ProductViewer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      curr_bid: props.item.curr_bid,
      newBid: ''
    }
  }


  
  render(){
    const { _id, item, min_cost, curr_bid, ends_in, image} = this.props.item;
    return(
      <div className = 'product-viewer'>
        <img src={image}></img>
        <h2>{item}</h2>
        <div className="product-viewer-details">
          <h4> Current Bid: ${curr_bid} </h4>
          <h4> Original Posting Price: ${min_cost} </h4>
          <h4> Bidding Ends In: {ends_in} day(s) </h4>
          <form>
            <label>New Bid:
              <input name="newBid" type="number" required></input>
              <button type="submit">Submit</button>
            </label>
          </form>
        </div>
      </div>
    );
  }
}