import React, { useState } from 'react';

const UploadCommand = () => {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [nameChangeMessage, setNameChangeMessage] = useState('');


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.name.endsWith('.csv')) {
            const fileName = selectedFile.name.toLowerCase().replace(/\s+/g, '-');
            const newFile = new File([selectedFile], fileName, { type: selectedFile.type });
            setFile(newFile);
            setMessage('');
        } else {
            setFile(null);
            setMessage('Unsupported file format, please select a .csv file.');
        }
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
                setNameChangeMessage('The name of the file is changed according to naming convention');
                setMessage(`${file.name} has been uploaded successfully.`);
                setFile(null);
            } else {
                setMessage('Failed to upload file. Please try again.');
            }
        } catch (error) {
            setMessage('Failed to upload file. Please try again.');
        }
    };

    return (
        <div>
            <h3>Upload Command</h3>
            <input type="file" accept=".csv" onChange={handleFileChange} /> <br />
            <button className='upload-btn' onClick={handleUpload}>Upload</button>
            {nameChangeMessage && <div className='upload-message' >{nameChangeMessage}</div>}
            {message && <div className='upload-message' >{message}</div>}
        </div>
    );
};

export default UploadCommand;
