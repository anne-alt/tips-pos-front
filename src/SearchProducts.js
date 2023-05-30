import React from "react";

function SearchProducts({searchProducts, setSearchProducts}) {
    return (
        <div>
            <label htmlFor="search">Search Product:</label>
            <input
            placeholder="Search by product name..."
            value={searchProducts}
            onChange={(event) => setSearchProducts(event.target.value)}
            />
        </div>
    )
}

export default SearchProducts