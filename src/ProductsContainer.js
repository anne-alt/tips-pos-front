import React, { useState } from "react";
import axios from 'axios';
import OneProduct from "./OneProduct";

function ProductsContainer({ products, setProducts }) {

    const [formData, setFormData] = useState({
        name: "",
        size: "",
        buying_price: "",
        quantity: "",
        selling_price: "",
        category: "",
        expiry: ""
    });
    const [selectedId, setSelectedId] = useState(null);

    function handleChange(event) {
        if (event.target.name === "buying_price") {
          const selling_price = parseFloat(event.target.value) * 1.2; // Calculate selling price as 120% of buying price
          setFormData({ ...formData, [event.target.name]: event.target.value, selling_price });
        } else {
          setFormData({
            ...formData,
            [event.target.name]: event.target.value,
          });
        }
    }

    const handleProductClick = (productId, event) => {
      const formElements = ['name', 'size', 'buying_price', 'quantity', 'selling_price', 'category', 'expiry'];
  
      if (event.target.tagName === 'INPUT' && formElements.includes(event.target.name)) {
          // Click event originated from within the form, do not close it
          return;
      }
  
      if (selectedId === productId) {
          setSelectedId(null);
          setFormData({
              name: "",
              size: "",
              buying_price: "",
              quantity: "",
              selling_price: "",
              category: "",
              expiry: ""
          });
      } else {
          setSelectedId(productId);
          const selectedProduct = products.find((product) => product.id === productId);
          if (selectedProduct) {
              setFormData({
                  name: selectedProduct.name,
                  size: selectedProduct.size,
                  buying_price: selectedProduct.buying_price,
                  quantity: selectedProduct.quantity,
                  selling_price: selectedProduct.selling_price,
                  category: selectedProduct.category,
                  expiry: selectedProduct.expiry
              });
          }
      }
  };

    const handleUpdateClick = () => {
        if (selectedId === null) {
            return; // No product is selected, do nothing
        }

        const updatedProduct = { ...formData };

        fetch(`/products/${selectedId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(r => r.json())
            .then((updatedProduct) => {
                setSelectedId(null);

                // Update the product in the products array
                const updatedProducts = products.map((product) => {
                    if (product.id === updatedProduct.id) {
                        return updatedProduct;
                    }
                    return product;
                });
                setProducts(updatedProducts);
            });
    }

  
    const deleteProduct = async (productId) => {
        try {
          await axios.delete(`/products/${productId}`);
          setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };


    

    const product = products.map(item => {
        return (
        <div 
          key= {item.id}
          onClick={(event) => handleProductClick(item.id, event)} >
            <OneProduct products={products} setProducts={setProducts}  id = {item.id} name={item.name} size= {item.size} selling_price={item.selling_price} quantity={item.quantity}/>
            <button onClick={() => deleteProduct(item.id)}>Delete</button>

          {
            selectedId === item.id && (
              <div>
                <h2>Update Product</h2>
                <label htmlFor="formData.name"> Name: </label>
                <input
                 type="input-text"
                 name="name"
                 onChange={handleChange}
                 value={formData.name}
                 placeholder="product name.."
                />
                <br />
                <label htmlFor="formData.size"> Size: </label>
                <input
                 type="input-text"
                 name="size"
                 onChange={handleChange}
                 value={formData.size}
                 placeholder="product size.."
                />
                <br />
                <label htmlFor="formData.buying_price"> Buying Price: </label>
                <input
                 type="input-text"
                 name="buying_price"
                 onChange={handleChange}
                 value={formData.buying_price}
                 placeholder="product buying price.."
                />
                <br />
                <label htmlFor="formData.quantity"> Quantity: </label>
                <input
                 type="input-text"
                 name="quantity"
                 onChange={handleChange}
                 value={formData.quantity}
                 placeholder="product quantity.."
                />
                <br />
                <label htmlFor="formData.selling_price"> Selling Price: </label>
                <input
                 type="input-text"
                 name="selling_price"
                 onChange={handleChange}
                 value={formData.selling_price}
                 placeholder="product selling price.."
                 readOnly
                />
                <br />
                <label htmlFor="formData.category"> Category: </label>
                <input
                 type="input-text"
                 name="category"
                 onChange={handleChange}
                 value={formData.category}
                 placeholder="product category.."
                />
                <br />
                <label htmlFor="formData.expiry"> Expiry: </label>
                <input
                 type="input-text"
                 name="expiry"
                 onChange={handleChange}
                 value={formData.expiry}
                 placeholder="product expiry.."
                />
                <br />
                <button onClick={handleUpdateClick}>Update</button>
              </div>

            )
          }
        </div>
    )})

    return(
        <div>
            {product}
        </div>
    )
}

export default ProductsContainer;