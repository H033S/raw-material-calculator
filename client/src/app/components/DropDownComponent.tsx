"use client";

const DropDownComponent = () => {
  return (
    <select className="form-select" aria-label="Select product">
      <option value="" defaultValue="true">Select a product</option>
      <option value="1">Product 1</option>
      <option value="2">Product 2</option>
      <option value="3">Product 3</option>
    </select>
  );
};

export default DropDownComponent; 