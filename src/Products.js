import { useEffect, useState } from "react";


function Products(){
    const [product, setProduct] = useState([])

    useEffect(() => {
        fetch(`/products`)
        .then(response => response.json)
        .then(data => console.log(data))
    }, [])

    return (
        <div>

        </div>
    )
}

export default Products;
