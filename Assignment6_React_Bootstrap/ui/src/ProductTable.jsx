import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Table,
} from 'react-bootstrap';

const ProductRow = withRouter(({
  product, location: { search }, deleteProduct, index,
}) => {
  const selectLocation = { pathname: `/products/${product.id}`, search };
  const viewTooltip = (
    <Tooltip id="view-tooltip" placement="top">View Product</Tooltip>
  );
  const editTooltip = (
    <Tooltip id="edit-tooltip" placement="top">Edit Product</Tooltip>
  );
  const deleteTooltip = (
    <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
  );

  function onDelete(e) {
    e.preventDefault();
    deleteProduct(product.id);
  }
  const tableRow = (
    <tr key={index}>
      <td>{product.name}</td>
      <td>
        $
        {product.price}
      </td>
      <td>{product.category}</td>
      <td>
        <LinkContainer to={`/view/${product.id}`}>
          <OverlayTrigger delayShow={500} overlay={viewTooltip}>
            <Button bsSize="xsmall">
              <Glyphicon glyph="eye-open" />
            </Button>
          </OverlayTrigger>
        </LinkContainer>
      </td>
      <td>
        <LinkContainer to={`/edit/${product.id}`}>
          <OverlayTrigger delayShow={500} overlay={editTooltip}>
            <Button bsSize="xsmall">
              <Glyphicon glyph="edit" />
            </Button>
          </OverlayTrigger>
        </LinkContainer>
        {' '}
        <OverlayTrigger delayShow={500} overlay={deleteTooltip}>
          <Button bsStyle="xsmall" onClick={onDelete}>
            <Glyphicon glyph="trash" />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
  return (
    <LinkContainer to={selectLocation}>
      {tableRow}
    </LinkContainer>
  );
});

export default function ProductTable({ products, deleteProduct }) {
  const productRows = products.map((product, index) => (
    <ProductRow key={product.id} product={product} deleteProduct={deleteProduct} index={index} />
  ));
  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </Table>
  );
}
