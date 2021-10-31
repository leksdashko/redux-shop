import React from "react";
import { Link } from "react-router-dom";

import './shop-header.css';

const ShopHeader = ({numItems, total}) => {
    return (
        <header className="shop-header">
            <Link to="/" className="logo text-dark">ReShop</Link>
            <Link to="/cart" className="shopping-cart">
                <i className="cart-icon fas fa-shopping-cart" />
                {numItems} items (${total})
            </Link>
        </header>
    );
}

export default ShopHeader;