import React from "react";
import OneProduct from "./OneProduct";

function ProductsContainer({products}) {

    const product = products.map(item => {
        <div>
            <OneProduct key= {item.id} name={item.name} selling_price={item.selling_price} quantity={item.quantity}/>
        </div>
    })
    return(
        {product}
    )
}

export default ProductsContainer;