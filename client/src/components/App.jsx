import React from 'react';
import ProductList from './ProductList.jsx';
import ProductViewer from './ProductViewer.jsx';
import Search from './Search.jsx';

import axios from 'axios';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      curr_bid: null,
      viewer: {},
      list: []
    }

    this.getProducts = this.getProducts.bind(this);
    this.changeViewer = this.changeViewer.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    axios.get('/name/products')
      .then( data => {
        this.setState({
          viewer: data.data[0],
          list: data.data
        });
      })
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

  render(){
    return(
      <div>
        <div>
          <h1>EBID</h1>
          <h3>The jankiest ebay rip-off you'll ever see (probably)</h3>
        </div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search />
          </div>
        </nav>
        <div className="row main-container">
          <div className="col-md-7 product-viewer-container">
            <ProductViewer item={this.state.viewer}/>
          </div>
          <div className="col-md-5 product-list-container">
            <ProductList list={this.state.list.slice(0, 10)} enhance={this.changeViewer}/>
          </div>
        </div>
      </div>
    );
  }
}