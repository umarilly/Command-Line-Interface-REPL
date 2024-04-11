import React, { useState, useEffect, useRef } from 'react';
import '../styles/terminal.css'
import CryptoPairs from './CryptoPairs'

const FetchPriceCommand = () => {

    const [inputValue, setInputValue] = useState('');
    const [pair, setPair] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [pair]);

    const fetchPrice = async () => {

        const inputParts = inputValue.trim().split(' ');

        if (inputParts.length < 2 || inputParts[0] !== 'fetch-price') {
            setError('Invalid input format. Please use "fetch-price [pair]"');
            return;
        }
        const fetchCommand = inputParts[0];
        console.log(fetchCommand);
        const pairValue = inputParts.slice(1);
        console.log(pairValue)
        setPair(pairValue);

        try {
            const response = await fetch(`https://api.binance.com/api/v3/avgPrice?symbol=${pairValue}`);
            const data = await response.json();
            setPrice(data.price);
            setError('');
        } catch (error) {
            setPrice('');
            setError('Error fetching price. Please try againn.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPrice();
    };

    return (
        <>
            <div>
                <div><h3>Please choose the pair you want to enter - OR you can enter any </h3></div>
                <div className='crypto-table'>
                    <CryptoPairs />
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='input-area' >
                            <div className='input-area-sign'> {'> '}</div>
                            <div className='input-area-box' >
                                <input
                                    type="text"
                                    value={inputValue}
                                    placeholder='Please enter fetch-price [pair]'
                                    onChange={handleInputChange}
                                    ref={inputRef}
                                />
                            </div>
                        </div>
                    </form>
                    {error ? <div>{error}</div> : <div>{price && `The current price of ${pair} is ${price}.`}</div>}
                </div>
            </div>
        </>
    );
};

export default FetchPriceCommand;
