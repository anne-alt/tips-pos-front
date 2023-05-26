import React from "react";

function OneProduct({name, size, selling_price, quantity}){

    return(
        <div>
            <p>{name}</p>
            <p>{size}</p>
            <p>{selling_price}</p>
            <p>{quantity}</p>
        </div>
    )
}

export default OneProduct;