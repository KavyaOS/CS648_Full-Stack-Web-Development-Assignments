import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const ProductRow = withRouter(({ product, deleteProduct, index }) => (
  <tr key={index}>
    <td>{product.name}</td>
    <td>
      $
      {product.price}
    </td>
    <td>{product.category}</td>
    <td><Link to={`/view/${product.id}`}> View </Link></td>
    <td>
      <Link to={`/edit/${product.id}`}>Edit</Link>
      {' | '}
      <button type="button" onClick={() => { deleteProduct(product.id); }}>Delete</button>
    </td>
  </tr>
));

export default function ProductTable({ products, deleteProduct }) {
  const productRows = products.map((product, index) => (
    <ProductRow key={product.id} product={product} deleteProduct={deleteProduct} index={index} />
  ));
  return (
    <table className="bordered-table">
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
    </table>
  );
}
