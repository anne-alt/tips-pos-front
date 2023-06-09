import { useEffect, useState } from "react";
import ProductsContainer from "./ProductsContainer";
import ProductsForm from "./ProductsForm";


function Products(){
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(`/products`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setProducts(data)})
    }, [])

    return (
        <div>
            <ProductsForm products={products} setProducts={setProducts}/>
            <ProductsContainer products={products} setProducts={setProducts}/>
        </div>
    )
}

export default Products;
