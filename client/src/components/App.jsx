import React from 'react';
import ProductList from './ProductList.jsx';
import ProductViewer from './ProductViewer.jsx';
import Search from './Search.jsx';

import axios from 'axios';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: 'home',
      viewer: {},
      list: [],
      item: '',
      min_cost: null,
      image: ''
    }

    this.getProducts = this.getProducts.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.changeViewer = this.changeViewer.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.createNewListing = this.createNewListing.bind(this);
    this.listingFieldChange = this.listingFieldChange.bind(this);
    this.submitNewListing = this.submitNewListing.bind(this);
    this.cancelNewListing = this.cancelNewListing.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    let viewerIndex;
    if (this.state.viewer._id) {
      this.state.list.forEach( (item, index) => {
        if (item._id === this.state.viewer._id) {
          viewerIndex = index;
        }
      });
    } else {
      viewerIndex = 0;
    }
    axios.get('/name/products')
      .then( data => {
        this.setState({
          viewer: data.data[viewerIndex],
          list: data.data
        });
      })
      .catch( err => console.error(err) );
  }

  addProduct(item) {
    axios.post('/name/products', item)
      .then( () => this.getProducts() )
      .catch( err => console.error(err) );
  }

  changeViewer(_id) {
    this.state.list.forEach( item => {
      if (item._id === _id) {
        this.setState({
          viewer: item
        });
      }
    });
  }

  handleSearch(term) {
    let _id = [];
    this.state.list.forEach ( item => {
      if ((item.item.toLowerCase()).includes(term.toLowerCase())) {
        _id.push(item._id);
      }
    });
    this.changeViewer(_id[0]);
    document.getElementById("search").value = ''
  }

  createNewListing(e) {
    e.preventDefault();
    this.setState({
      page: 'createListing'
    });
  }

  listingFieldChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitNewListing(e) {
    e.preventDefault();
    const newItem = {
      item: this.state.item,
      min_cost: this.state.min_cost,
      curr_bid: 0,
      ends_in: 6,
      image: this.state.image
    };
    this.addProduct(newItem);
    this.setState({
      page: 'home'
    });
  }

  cancelNewListing(e) {
    e.preventDefault();
    this.setState({
      page: 'home'
    });
  }

  render(){
    if (this.state.page === 'home') {
      return(
        <div>
          <div>
            <h1>EBID</h1>
            <h3>The jankiest ebay rip-off you'll ever see (probably)</h3>
          </div>
          <nav className="navbar">
            <div className="col-md-6 offset-md-3">
              <Search search={this.handleSearch}/>
            </div>
          </nav>
          <div>
              <button onClick={this.createNewListing}>Create New Listing</button>
          </div>
          <div className="row main-container">
            <div className="col-md-7 product-viewer-container">
              <ProductViewer item={this.state.viewer} update={this.getProducts}/>
            </div>
            <div className="col-md-5 product-list-container">
              <ProductList list={this.state.list.slice(0, 10)} enhance={this.changeViewer}/>
            </div>
          </div>
        </div>
      );
    } else if (this.state.page = 'createListing') {
      return (
        <div>
          <div>
            <h1>EBID</h1>
            <h3>The jankiest ebay rip-off you'll ever see (probably)</h3>
          </div>
          <h2>Create New Listing</h2>
          <h4>(Please fill out all fields and then click 'Create Listing'.
            Press 'Cancel' to return to the home page.)</h4>
          <br></br>
          <form onSubmit={this.submitNewListing}>
            <label>Title:
              <input type="text" name="item" required onChange={this.listingFieldChange}></input>
            </label>
            <br></br>
            <br></br>
            <label>Reserve: $
              <input type="number" name="min_cost" required onChange={this.listingFieldChange}></input>
            </label>
            <br></br>
            <br></br>
            <label>Image URL:
              <input type="text" name="image" required onChange={this.listingFieldChange}></input>
            </label>
            <br></br>
            <br></br>
            <button type="submit">Create Listing</button>
          </form>
          <br></br>
          <button onClick={this.cancelNewListing}>Cancel</button>
        </div>
      );
    }
  }
}