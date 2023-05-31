import React, { useState } from "react";
import OneProduct from "./OneProduct";
import SearchProducts from "./SearchProducts";

function ReceiptsForm({ receipts, setReceipts, products }) {
  const [formData, setFormData] = useState({
    customer_name: "",
    cash: "",
    mpesa: "",
    selectedProduct: null,
    selectedProducts: [],
  });
  const [searchProducts, setSearchProducts] = useState("");
  const [calculatedTotal, setCalculatedTotal] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === "quantity") {
      calculateTotal(formData.selectedProduct, value);
    }
  };

  const handleProductSelect = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    setFormData({ ...formData, selectedProduct });
    calculateTotal(selectedProduct, formData.quantity);
  };

  const handleAddProduct = () => {
    const { selectedProduct, selectedProducts } = formData;
    if (selectedProduct) {
      const updatedSelectedProducts = [...selectedProducts, selectedProduct];
      setFormData({
        ...formData,
        selectedProduct: null,
        selectedProducts: updatedSelectedProducts,
      });
      calculateTotal(null, formData.quantity);
    }
  };

  const handleRemoveProduct = (productId) => {
    const updatedSelectedProducts = formData.selectedProducts.filter(
      (product) => product.id !== productId
    );
    setFormData({ ...formData, selectedProducts: updatedSelectedProducts });
    calculateTotal(null, formData.quantity);
  };

  const calculateTotal = (product, quantity) => {
    if (product && quantity) {
      const totalPrice = product.selling_price * quantity;
      setCalculatedTotal(totalPrice);
    } else {
      setCalculatedTotal(0);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    const { selectedProduct, selectedProducts, ...receiptData } = formData;
    const productIds = selectedProducts.map((product) => product.id);
    const newReceipt = { ...receiptData, product_ids: productIds };

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
          cash: "",
          mpesa: "",
          selectedProduct: null,
          selectedProducts: [],
        });
        const allReceipts = [...receipts, newReceipt];
        setReceipts(allReceipts);
      });
  }

  const searcher = products.filter((item) =>
    item.name.toLowerCase().includes(searchProducts.toLowerCase())
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
        <button onClick={() => handleProductSelect(item.id)}>
          Select Product
        </button>
      </div>
    );
  });

  const selectedProductsRows = formData.selectedProducts.map((product) => (
    <div key={product.id}>
      <OneProduct
        id={product.id}
        name={product.name}
        size={product.size}
        selling_price={product.selling_price}
        quantity={product.quantity}
      />
      <button onClick={() => handleRemoveProduct(product.id)}>
        Remove Product
      </button>
      <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
      <input
        type="number"
        id={`quantity-${product.id}`}
        value={product.quantity}
        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
      />
    </div>
  ));

  const handleQuantityChange = (productId, quantity) => {
    const updatedSelectedProducts = formData.selectedProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: quantity };
      }
      return product;
    });
    setFormData({ ...formData, selectedProducts: updatedSelectedProducts });
    calculateTotal(null, formData.quantity);
  };

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

        {formData.selectedProduct && (
          <>
            <label htmlFor="total">Total:</label>
            <input
              type="number"
              name="total"
              value={calculatedTotal}
              readOnly
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

        {!formData.selectedProduct && (
          <>
            <SearchProducts
              searchProducts={searchProducts}
              setSearchProducts={setSearchProducts}
            />
            {rows}
          </>
        )}

        {selectedProductsRows}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReceiptsForm;