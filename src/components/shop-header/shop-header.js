import React from "react";

import './shop-header.css';

const ShopHeader = ({numItems, total}) => {
    return (
        <header className="shop-header">
            <a className="logo text-dark" href="#">ReShop</a>
            <a className="shopping-cart">
                <i className="cart-icon fas fa-shopping-cart" />
                {numItems} items (${total})
            </a>
        </header>
    );
}

export default ShopHeader;