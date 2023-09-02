import React from 'react';

const AddToCart = ({ cartItems, total }) => {
    return (
        <div id="cartDiv">
            <h2>Cart</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        {item.item.name} - Quantity: {item.quantity} - Size: {item.size}
                    </li>
                ))}
            </ul>
            <h3>Total: ${total}</h3>
            <button > Place Order</button>
        </div>
    );
};

export default AddToCart;
