import React from "react";
import axios from 'axios';
import OneProduct from "./OneProduct";

function ProductsContainer({products, setProducts}) {

    

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
        <div key= {item.id}>
            <OneProduct products={products} setProducts={setProducts}  id = {item.id} name={item.name} size= {item.size} selling_price={item.selling_price} quantity={item.quantity}/>
            <button onClick={() => deleteProduct(item.id)}>Delete</button>
        </div>
    )})

    return(
        <div>
            {product}
        </div>
    )
}

export default ProductsContainer;