import React, { useState } from "react";
import OneProduct from "./OneProduct";
import SearchProducts from "./SearchProducts";

function ReceiptsForm({ receipts, setReceipts, products }) {
  const [formData, setFormData] = useState({
    customer_name: "",
    product_id: "",
    quantity: "",
    total: "",
    cash: "",
    mpesa: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchProducts, setSearchProducts] = useState("");

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
  };

  const handleAddProduct = () => {
    setFormData({ ...formData, product_id: selectedProduct });
  };

  function handleSubmit(event) {
    event.preventDefault();

    const newReceipt = { ...formData };

    fetch("/receipts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReceipt),
    })
      .then((r) => r.json())
      .then((newReceipt) => {
        setFormData({
          customer_name: "",
          product_id: "",
          quantity: "",
          total: "",
          cash: "",
          mpesa: "",
        });
        setSelectedProduct(null);
        const allReceipts = [...receipts, newReceipt];
        setReceipts(allReceipts);
      });
  }
  const searcher = products.filter((item) =>
    item.name.includes(searchProducts)
  );

  const rows = searcher.map((item) => {
    return (
      <div key={item.id}>
        <OneProduct
          id={item.id}
          name={item.name}
          size={item.size}
          selling_price={item.selling_price}
          quantity={item.quantity}
        />
        <button onClick={() => handleProductSelect(item.id)}>Select Product</button>
      </div>
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>New Receipt</h2>
        <label htmlFor="customer_name">Customer Name:</label>
        <input
          type="text"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleInputChange}
        />

        <label htmlFor="product_id">Product ID:</label>
        <input
          type="text"
          name="product_id"
          value={formData.product_id}
          onChange={handleInputChange}
          readOnly
        />

        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>

        {selectedProduct && (
          <>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />

            <label htmlFor="total">Total:</label>
            <input
              type="number"
              name="total"
              value={formData.total}
              onChange={handleInputChange}
            />

            <label htmlFor="cash">Cash:</label>
            <input
              type="number"
              name="cash"
              value={formData.cash}
              onChange={handleInputChange}
            />

            <label htmlFor="mpesa">Mpesa:</label>
            <input
              type="number"
              name="mpesa"
              value={formData.mpesa}
              onChange={handleInputChange}
            />
          </>
        )}

        {!selectedProduct && (
          <>
            <SearchProducts
              searchProducts={searchProducts}
              setSearchProducts={setSearchProducts}
            />
            {rows}
          </>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReceiptsForm;