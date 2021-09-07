import React from 'react';
import { Label, Panel, Glyphicon } from 'react-bootstrap';
import graphQLFetch from './graphQLFetch.js';
import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import Toast from './Toast.jsx';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      toastVisible: false,
      toastMessage: '',
      toastType: 'info',
    };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
          productList {
              id
              category
              name
              price
              imageurl
          }
      }`;

    const data = await graphQLFetch(query, this.showError);
    if (data) {
      this.setState({ products: data.productList });
    }
  }

  async createProduct(product) {
    const query = `mutation productAdd($product: ProductInputs!) {
        productAdd(product: $product) {
          id
        }
      }`;

    const data = await graphQLFetch(query, { product }, this.showError);
    if (data) {
      this.loadData();
    }
  }

  async deleteProduct(id) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;

    const data = await graphQLFetch(query, { id }, this.showError);
    this.showSuccess(`Deleted product ${id} successfully.`);
    this.loadData();
    return true;
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
    const { products } = this.state;
    const { toastVisible, toastType, toastMessage } = this.state;
    return (
      <React.Fragment>
        <h3><Label>Showing all available products</Label></h3>
        <hr />
        <ProductTable products={products} deleteProduct={this.deleteProduct} />
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>
              Add a new product to the Inventory
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <ProductAdd createProduct={this.createProduct} />
          </Panel.Body>
        </Panel>
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </React.Fragment>
    );
  }
}
