import React, { useState, useEffect, useRef } from 'react';
import '../styles/terminal.css'
import CryptoPairs from './CryptoPairs'

const FetchPriceCommand = () => {

    const [pair, setPair] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [pair]);

    const fetchPrice = async () => {
        try {
            const response = await fetch(`https://api.binance.com/api/v3/avgPrice?symbol=${pair}`);
            const data = await response.json();
            setPrice(data.price);
            setError('');
        } catch (error) {
            setPrice('');
            setError('Error fetching price. Please try again.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPrice();
    };

    return (
        <>
            <div>
                <div><h3>Fetch Price Command</h3></div>
                <div><h3>Please choose the pair you want to enter - OR you can enter any  </h3></div>
                <div className='crypto-table' >
                    <CryptoPairs/>
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={pair}
                            placeholder='Enter the Cryptocurrency'
                            onChange={(e) => setPair(e.target.value)}
                            ref={inputRef}
                        />
                    </form>
                    {error ? <div>{error}</div> : <div>{price && `The current price of ${pair} is ${price}.`}</div>}
                </div>
            </div>
        </>
    );
};

export default FetchPriceCommand;
