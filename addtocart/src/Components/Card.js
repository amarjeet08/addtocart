import React, { useState, useEffect } from 'react';
import './Card.css';
import FoodItem from './FoodItem';
import AddToCart from './AddToCart'; // Import the AddToCart component

const Card = () => {
    const [data, setData] = useState([]);
    const [itemStates, setItemStates] = useState([]);
    const [cartItems, setCartItems] = useState([]); // Add cartItems state
    const [total, setTotal] = useState(0); // Add total state

    useEffect(() => {
        fetch('http://localhost:3001/foodData')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setItemStates(data.map((item) => ({ quantity: 1, size: Object.keys(item.options[0])[0] })));
            });
    }, []);

    const handleQuantityChange = (e, index) => {
        const newValue = e.target.value;
        setItemStates((prevState) =>
            prevState.map((itemState, i) => (i === index ? { ...itemState, quantity: newValue } : itemState))
        );
    };

    const handleSizeChange = (e, index) => {
        const newValue = e.target.value;
        setItemStates((prevState) =>
            prevState.map((itemState, i) => (i === index ? { ...itemState, size: newValue } : itemState))
        );
    };

    const addToCart = (item, quantity, size) => {
        // Create a copy of the cartItems array with the new item
        const newCartItems = [...cartItems, { item, quantity, size }];
        setCartItems(newCartItems);

        // Calculate the total price based on the new cartItems
        const newTotal = newCartItems.reduce((acc, cartItem) => {
            const price = cartItem.item.options[0][cartItem.size];
            return acc + price * cartItem.quantity;
        }, 0);
        setTotal(newTotal);
    };

    return (
        <div id="mainDiv">
            {data.map((item, index) => (
                <FoodItem
                    key={item._id}
                    item={item}
                    quantity={itemStates[index].quantity}
                    size={itemStates[index].size}
                    handleQuantityChange={(e) => handleQuantityChange(e, index)}
                    handleSizeChange={(e) => handleSizeChange(e, index)}
                    addToCart={addToCart} // Pass the addToCart function as a prop
                />
            ))}
            <AddToCart cartItems={cartItems} total={total} /> {/* Add the AddToCart component */}
        </div>
    );
};

export default Card;
