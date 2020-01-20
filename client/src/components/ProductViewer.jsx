import React from 'react';
import axios from 'axios';

export default class ProductViewer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      newBid: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    const { _id, curr_bid } = this.props.item;
    e.preventDefault();
    if (this.state.newBid > curr_bid) {
      axios.put(`/name/products/${_id}`, { curr_bid: this.state.newBid })
        .then( () => this.props.update() )
        .catch( err => console.error(err) );
        e.target.reset();
    } else {
      alert('Your bid must be more than the current bid!');
    }
  }
  
  render(){
    const { item, min_cost, curr_bid, ends_in, image} = this.props.item;
    return(
      <div className = 'product-viewer'>
        <img src={image}></img>
        <h2>{item}</h2>
        <div className="product-viewer-details">
          <h4> Current Bid: ${curr_bid} </h4>
          <h4> Original Posting Price: ${min_cost} </h4>
          <h4> Bidding Ends In: {ends_in} day(s) </h4>
          <form onSubmit={this.handleSubmit}>
            <label>New Bid:
              <input name="newBid" type="number" required onChange={this.handleChange}></input>
              <button type="submit">Submit</button>
            </label>
          </form>
        </div>
      </div>
    );
  }
}