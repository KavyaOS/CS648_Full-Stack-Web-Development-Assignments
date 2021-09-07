import React from 'react';

import graphQLFetch from './graphQLFetch.js';

class ProductImage extends React.Component {
  constructor() {
    super();
    this.state = { product: {} };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query product($id: Int!) {
        product(id: $id) {
          id
          category
          name
          price
          imageurl
        }
    }`;

    const {
      match: {
        params: { id },
      },
    } = this.props;

    const data = await graphQLFetch(query, { id });
    if (data) {
      this.setState({ product: data.product });
    } else this.setState({ product: null });
  }

  render() {
    const { product } = this.state;
    return <img style={{ maxWidth: '100vw' }} src={product.imageurl} alt={product.Name} />;
  }
}

export default ProductImage;
