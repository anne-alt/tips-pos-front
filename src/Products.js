import { useEffect, useState } from "react";
import OneProduct from "./OneProduct";
import ProductsContainer from "./ProductsContainer";
import ProductsForm from "./ProductsForm";


function Products(){
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(`/products`)
        .then(res => res.json())
        .then(data => console.log(data))
    }, [])

    return (
        <div>
            <ProductsForm/>
            {/* <ProductsContainer products={products}/> */}

        </div>
    )
}

export default Products;
