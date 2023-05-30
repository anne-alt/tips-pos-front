import React, { useState } from "react";

function ProductsForm({products, setProducts}){
    const [formData, setFormData] = useState({
        name: "",
        size: "",
        buying_price: "",
        quantity: "",
        selling_price: "",
        category: "",
        expiry: ""
        
    })

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

      function handleSubmit(event){
        event.preventDefault();

        const newProduct = {...formData}

        fetch("/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          })
          .then(r => r.json())
          .then((newProduct) => {
            setFormData({
                name: "",
                size: "",
                buying_price: "",
                quantity: "",
                selling_price: "",
                category: "",
                expiry: "",
            })
            const allProducts = [...products, newProduct]
            setProducts(allProducts)
          })
      }

    return(
        <div>
            <form onSubmit={handleSubmit} >
             <h3 className="formtitle"><strong> Create Product</strong></h3>
                <input
                 type="input-text"
                 name="name"
                 onChange={handleChange}
                 value={formData.name}
                 placeholder="product name.."
                 className="formbox"
                />
                <input
                 type="input-text"
                 name="size"
                 onChange={handleChange}
                 value={formData.size}
                 placeholder="product size.."
                 className="formbox"
                />
                <input
                 type="number"
                 name="buying_price"
                 onChange={handleChange}
                 value={formData.buying_price}
                 placeholder="buying price..."
                 className="formbox"
                />
                <input
                 type="number"
                 name="selling_price"
                 onChange={handleChange}
                 value={formData.selling_price}
                 placeholder="selling price.."
                 readOnly
                 className="formbox"
                />
                <input
                 type="number"
                 name="quantity"
                 onChange={handleChange}
                 value={formData.quantity}
                 placeholder="how many?..."
                 className="formbox"
                />
                <input
                 type="input-text"
                 name="category"
                 onChange={handleChange}
                 value={formData.category}
                 placeholder="category...."
                 className="formbox"
                />
                <input
                 type="input-text"
                 name="expiry"
                 onChange={handleChange}
                 value={formData.expiry}
                 placeholder="good till when?..."
                 className="formbox"
                />
                <input
                 type="submit"
                 name="submit"
                 value="Create Product"
                 className="formbutton"
                />
            </form>

        </div>
    )

}

export default ProductsForm;