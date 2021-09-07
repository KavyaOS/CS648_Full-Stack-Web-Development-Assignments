import React from 'react';
import PropTypes from 'prop-types';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.state = { price: '$' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const priceNum = form.price.value.replace(/\$/g, '');
    const product = {
      name: form.name.value,
      price: priceNum,
      category: form.category.value,
      imageurl: form.imageurl.value,
    };
    const { createProduct } = this.props;
    createProduct(product);
    form.name.value = '';
    this.setState({ price: '$' });
    form.category.value = '';
    form.imageurl.value = '';
  }

  handlePriceChange(e) {
    this.setState({ price: e.target.value });
  }

  render() {
    const { price } = this.state;
    return (
      <form name="productAdd" onSubmit={this.handleSubmit}>
        <div className="formContainer">
          <div className="formCol">
            Category:
            <br />
            <select name="category">
              <option value="Shirts">Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Jackets">Jackets</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Accessories">Accessories</option>
            </select>
            <br />
            Product Name:
            <br />
            <input type="text" name="name" />
            <br />
          </div>
          <div className="formCol">
            Price Per Unit:
            <br />
            <input type="text" name="price" value={price} onChange={this.handlePriceChange} />
            <br />
            Image URL:
            <br />
            <input type="text" name="imageurl" />
            <br />
          </div>
        </div>
        <button type="submit">Add Product</button>
      </form>
    );
  }
}
