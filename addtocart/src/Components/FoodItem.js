import React from 'react';

const FoodItem = ({ item, quantity, size, handleQuantityChange, handleSizeChange, addToCart }) => {
    const calculatePrice = () => {
        const price = item.options[0][size];
        return price * quantity;
    };

    // Define a function to handle adding the item to the cart
    const handleAddToCart = () => {
        addToCart(item, quantity, size);
    };

    return (
        <div id="container">
            <h4>{item.CategoryName}</h4>
            <h4>{item.name}</h4>
            <img src={item.img} alt={item.name} />
            <select onChange={handleQuantityChange} value={quantity}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
            </select>
            <select onChange={handleSizeChange} value={size}>
                {Object.keys(item.options[0]).map((optionSize) => (
                    <option key={optionSize} value={optionSize}>
                        {optionSize}
                    </option>
                ))}
            </select>
            <br />
            <h4>Price: {calculatePrice()}</h4>

            {/* Add a button to trigger adding the item to the cart */}
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default FoodItem;


