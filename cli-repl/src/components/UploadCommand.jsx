import React, { useState } from 'react';

const UploadCommand = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('File uploaded successfully.');
                setFile(null);
            } else {
                setMessage('Failed to upload file. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Failed to upload file. Please try again.');
        }
    };

    return (
        <div>
            <h3>Upload Command</h3>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <div>{message}</div>}
        </div>
    );
};

export default UploadCommand;
