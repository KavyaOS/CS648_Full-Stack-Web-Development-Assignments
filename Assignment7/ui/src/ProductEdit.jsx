import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Form, FormGroup, ControlLabel, FormControl, InputGroup,
} from 'react-bootstrap';
import graphQLFetch from './graphQLFetch.js';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';
import Toast from './Toast.jsx';

export default class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;
    const query = `mutation productUpdate(
        $id: Int!
        $changes: ProductUpdateInputs!
    ) {
        productUpdate(
            id: $id
            changes: $changes
    ) {
        id
        category
        name
        price
        imageurl
    }
    }`;
    const { id, created, ...changes } = product;
    const data = await graphQLFetch(query, { changes, id }, this.showError);
    if (data) {
      this.setState({ product: data.productUpdate });
      this.showSuccess('Updated product successfully');
    }
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

    const { match: { params: { id } } } = this.props;
    const data = await graphQLFetch(query, { id });
    this.setState({ product: data.product });
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  render() {
    const {
      product: {
        id, category, name, price, imageurl,
      },
    } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    const { toastVisible, toastMessage, toastType } = this.state;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`Product with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }

    return id ? (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>{`Editing Product ID: ${id}`}</h1>
          <table>
            <tbody>
              <tr>
                <FormGroup>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl type="text" name="name" value={name} onChange={this.onChange} key={id} />
                </FormGroup>
              </tr>
              <tr>
                <FormGroup controlId="form-category">
                  <ControlLabel>Category</ControlLabel>
                  <FormControl componentClass="select" value={category} name="category" onChange={this.onChange}>
                    <option value="Shirts">Shirts</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Jackets"> Jackets</option>
                    <option value="Sweaters">Sweaters </option>
                    <option value="Accessories">Accessories</option>
                  </FormControl>
                </FormGroup>
              </tr>
              <tr>
                <FormGroup>
                  <ControlLabel>Price</ControlLabel>
                  <FormControl name="price" value={price} onChange={this.onChange} key={id} />
                </FormGroup>
              </tr>
              <tr>
                <FormGroup>
                  <ControlLabel>Image:</ControlLabel>
                  <FormControl name="imageurl" value={imageurl} onChange={this.onChange} key={id} />
                </FormGroup>
              </tr>
              <tr>
                <tr>
                  <Button bsStyle="primary" as="input" type="submit" value="Submit">
                    Submit
                  </Button>
                </tr>
              </tr>
            </tbody>
          </table>
          <Link to={`/edit/${id - 1}`}>Prev</Link>
          {' | '}
          <Link to={`/edit/${id + 1}`}>Next</Link>
          <Toast
            showing={toastVisible}
            onDismiss={this.dismissToast}
            bsStyle={toastType}
          >
            {toastMessage}
          </Toast>
        </form>
      </div>
    ) : (
      <h1>Loading Data...</h1>
    );
  }
}
