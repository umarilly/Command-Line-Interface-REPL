
import React, { useState, useEffect } from 'react';
import '../styles/terminal.css'

const FetchPriceCommand = ({ sendInput }) => {

    const [pair, setPair] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const inputValue = sendInput.join(' ');

    const fetchPrice = async () => {

        const inputParts = inputValue.trim().split(' ');

        if (inputParts.length < 2 || inputParts[0] !== 'fetch-price') {
            setError('Invalid input format. Please use "fetch-price [pair]"');
            return;
        }
        
        const pairValue = inputParts[1];
        setPair(pairValue);

        try {
            const response = await fetch(`https://api.binance.com/api/v3/avgPrice?symbol=${pairValue}`);
            const data = await response.json();
            setPrice(data.price);
            setError('');
        } catch (error) {
            setPrice('');
            setError('Error fetching price. Please try again.');
        }
    };

    useEffect(() => {
        fetchPrice();
    }, []);

    return (
        <>
            <div>
                <div>
                    {error ? <div>{error}</div> : <div style={{ marginLeft: '10px' }} >{price && `The current price of ${pair} is ${price}.`}</div>}
                </div>
            </div>
        </>
    );
};

export default FetchPriceCommand;
