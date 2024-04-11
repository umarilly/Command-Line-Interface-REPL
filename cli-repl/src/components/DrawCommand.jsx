
import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DrawCommand = () => {

    const [inputValue, setInputValue] = useState('');
    const [chartData, setChartData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [successMessage, SetSuccessMessage] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [inputValue]);

    const handleDraw = async () => {
        const inputParts = inputValue.trim().split(' ');
        if (inputParts.length < 3 || inputParts[0] !== 'draw') {
            setMessage('Invalid input format. Please use "draw [file.csv] [column_name1] [column_name2] ..."');
            return;
        }
        
        const fileName = inputParts[1];
        const cols = inputParts.slice(2);
        setColumns(cols);

        try {

            const fileResponse = await fetch(`http://localhost:5000/api/checkFile/${fileName}`);
            const fileData = await fileResponse.json();
            if (!fileData.exists) {
                setMessage(`File '${fileName}' not found`);
                return;
            }
            else {
                const columnResponse = await fetch(`http://localhost:5000/api/checkColumns/${fileName}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ columns: cols }),
                });

                const columnData = await columnResponse.json();
                const missingColumns = columnData.missingColumns;
                if (missingColumns.length > 0) {
                    setMessage(`Columns [${missingColumns.join(', ')}] not found in file '${fileName}'`);
                    return;
                }
            }

            const response = await fetch('http://localhost:5000/api/draw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ file: fileName, columns: cols }),
            });

            if (response.ok) {
                const data = await response.json();
                setChartData(data.chart_data);
                SetSuccessMessage(' - Chart drawn successfully.')
                setMessage(` - Drawing chart based on ${fileName} file`);
            } else {
                setMessage('Failed to fetch chart data');
            }
        } catch (error) {
            setMessage('Error fetching chart data');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleDraw();
        }
    };

    return (
        <div>
            <h3>Draw Command</h3>
            <div className='input-area'>
                <div className='input-area-sign'> {'> '}</div>
                <div className='input-area-box'>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        ref={inputRef}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter command - draw file-name.csv column-name-1 column-name-2 ... )" />
                </div>
            </div>
            {message && <div style={{ marginLeft : '25px' }} >{message}</div>}
            {successMessage && <div style={{ marginLeft : '25px' }}>{successMessage}</div>}
            {chartData.length > 0 && (
                <div className='linechart-div'>
                    <LineChart
                        width={600}
                        height={400}
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {columns.map((column, index) => (
                            <Line key={index} type="monotone" dataKey={column} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                        ))}
                    </LineChart>
                </div>
            )}
        </div>
    );
};

export default DrawCommand;
