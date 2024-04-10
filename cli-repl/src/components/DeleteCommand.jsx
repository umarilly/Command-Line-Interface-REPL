
import React, { useState } from 'react';

const DeleteCommand = () => {
    const [fileName, setFileName] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setFileName(e.target.value);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ file: fileName }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setFileName('');
            } else {
                setMessage('Failed to delete file. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting file:', error);
            setMessage('Failed to delete file. Please try again.');
        }
    };

    return (
        <div>
            <h3>Delete Command</h3>
            <input type="text" value={fileName} onChange={handleInputChange} placeholder="Enter the name of file" />
            <button onClick={handleDelete}>Delete File</button>
            {message && <div>{message}</div>}
        </div>
    );
};

export default DeleteCommand;
