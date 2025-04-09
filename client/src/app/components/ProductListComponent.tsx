"use client";

const ProductListComponent = () => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Product rows will go here */}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListComponent; 