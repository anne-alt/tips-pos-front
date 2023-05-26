import React from "react";
import OneProduct from "./OneProduct";

function ProductsContainer({products}) {

    const product = products.map(item => ( <OneProduct key= {item.id} name={item.name} size= {item.size} selling_price={item.selling_price} quantity={item.quantity}/>
    ))

    console.log(product)

    return(
        <div>
            {product}
        </div>
    )
}

export default ProductsContainer;