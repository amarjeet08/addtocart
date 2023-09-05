import React from 'react';

const AddToCart = ({ cartItems, total }) => {
    const handlePayment = async () => {
        const orderTotal = total;

        console.log('Button clicked');
        console.log('Order Total:', orderTotal);

        try {
            const response = await fetch('http://localhost:3001/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: orderTotal })
            });

            console.log('Response status:', response.status); // Log the HTTP response status

            if (response.ok) {
                console.log('Order placed successfully');

                // Parse the JSON response to get the Razorpay order details
                const order = await response.json();

                // Create a Razorpay instance and open the payment form
                const options = {
                    key: 'rzp_test_9selXw6bGldk59',
                    amount: order.amount,
                    currency: order.currency,
                    name: 'YOUR_BUSINESS_NAME',
                    description: 'YOUR_DESCRIPTION',
                    image: 'YOUR_LOGO_URL',
                    order_id: order.id,
                    handler: function (response) {
                        // Handle successful payment here
                        console.log('Payment successful:', response);
                    },
                    prefill: {
                        name: 'CUSTOMER_NAME',
                        email: 'CUSTOMER_EMAIL',
                        contact: 'CUSTOMER_CONTACT'
                    },
                    notes: {
                        address: 'CUSTOMER_ADDRESS'
                    },
                    theme: {
                        color: '#F37254'
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                console.error('Order placement failed');
                // Handle errors (e.g., display an error message)
            }
        } catch (error) {
            console.error('Error placing order:', error);
            // Handle the error appropriately (e.g., display an error message to the user)
        }
    };


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
            <button onClick={handlePayment}>Place Order</button>
        </div>
    );
};

export default AddToCart;
