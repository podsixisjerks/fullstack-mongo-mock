import React from 'react';
import ProductList from './ProductList.jsx';
import ProductViewer from './ProductViewer.jsx';
import Search from './Search.jsx';

import axios from 'axios';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewer: {},
      list: []
    }

    this.getProducts = this.getProducts.bind(this);
    this.changeViewer = this.changeViewer.bind(this);
  }

  componentDidMount() {
    this.getProducts();
    // this.setState({
    //   viewer: this.state.list[0]
    // });
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
            <ProductViewer item={this.state.viewer} update={this.getProducts}/>
          </div>
          <div className="col-md-5 product-list-container">
            <ProductList list={this.state.list.slice(0, 10)} enhance={this.changeViewer}/>
          </div>
        </div>
      </div>
    );
  }
}