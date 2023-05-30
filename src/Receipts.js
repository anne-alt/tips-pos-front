import React, {useEffect, useState} from "react";
import ReceiptsForm from "./ReceiptsForm";

function Receipts() {

    const [receipts, setReceipts] = useState("");
    const [products, setProducts] = useState([])


    useEffect(() => {
        fetch(`/receipts`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setReceipts(data)})
    }, [])


    useEffect(() => {
        fetch(`/products`)
        .then(res => res.json())
        .then(data => {
            setProducts(data)})
    }, [])

    

    return (
        <div>
            <ReceiptsForm receipts={receipts} setReceipts={setReceipts} products={products}/> 
        </div>
    )

}

export default Receipts;