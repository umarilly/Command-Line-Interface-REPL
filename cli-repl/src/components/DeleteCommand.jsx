
import React, { useState, useEffect, useRef } from 'react';

const DeleteCommand = () => {

    const [inputValue, setInputValue] = useState('');
    const [fileName, setFileName] = useState('');
    const [message, setMessage] = useState('');

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    });

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleDelete = async () => {

        const inputParts = inputValue.trim().split(' ');
        if (inputParts.length < 2 || inputParts[0] !== 'delete') {
            setMessage('Invalid input format. Please use "delete [file.csv]"');
            return;
        }

        const deleteCommand = inputParts[0];
        const fileName = inputParts[1];

        try {
            const response = await fetch(`http://localhost:5000/api/checkFile/${fileName}`);
            const data = await response.json();

            if (data.exists) {
                const deleteResponse = await fetch('http://localhost:5000/api/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ file: fileName }),
                });

                if (deleteResponse.ok) {
                    const deleteData = await deleteResponse.json();
                    setMessage(deleteData.message);
                    setFileName('');
                } else {
                    setMessage('Failed to delete file. Please try again.');
                }
            } else {
                setMessage('No such file exists.');
            }
        } catch (error) {
            setMessage('Failed to delete file. Please try again.');
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (inputValue.trim() === '') {
                setMessage('Please enter file name first');
            } else {
                handleDelete();
            }
        }
    };


    return (
        <div>
            <h3>Delete Command</h3>
            <div className='input-area'>
                <div className='input-area-sign'> {'> '}</div>
                <div className='input-area-box'>
                    <input
                        type="text"
                        value={inputValue}
                        ref={inputRef}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter command - delete [file.csv]"
                    />
                </div>
            </div>

            {message && <div className='upload-message' >{message}</div>}
        </div>
    );
};

export default DeleteCommand;
