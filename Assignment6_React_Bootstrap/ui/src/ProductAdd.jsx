import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, ControlLabel, FormControl, InputGroup,
} from 'react-bootstrap';

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
    form.name.value = '';
    form.price.value = '';
    form.category.value = '';
    form.imageurl.value = '';
    createProduct(product);
  }

  handlePriceChange(e) {
    this.setState({ price: e.target.value });
  }

  render() {
    const { price } = this.state;
    return (
      <Form name="productAdd" onSubmit={this.handleSubmit}>
        <div className="formContainer">
          <div className="formCol">
            <FormGroup controlId="category" name="category">
              <ControlLabel>Category</ControlLabel>
              <FormControl componentClass="select" placeholder="select" name="category">
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Jackets">Jackets</option>
                <option value="Sweaters">Sweaters</option>
                <option value="Accessories">Accessories</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Product Name</ControlLabel>
              <FormControl type="text" name="name" />
            </FormGroup>
          </div>
          <div className="formCol">
            <FormGroup>
              <ControlLabel>Price Per Unit</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl type="text" name="price" onChange={this.handlePriceChange} />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Image URL</ControlLabel>
              <FormControl type="text" name="imageurl" />
            </FormGroup>
          </div>
        </div>
        <Button bsStyle="primary" as="input" type="submit" value="Submit">
          Add Product
        </Button>
      </Form>
    );
  }
}

ProductAdd.propTypes = {
  createProduct: PropTypes.func.isRequired,
};
