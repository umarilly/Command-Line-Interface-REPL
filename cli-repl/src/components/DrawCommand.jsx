
import React, { useState , useEffect , useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DrawCommand = () => {
    
    const [inputValue, setInputValue] = useState('');
    const [chartData, setChartData] = useState([]);
    const [columns, setColumns] = useState([]);

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
            alert('Invalid input format. Please use "draw [file.csv] [column_name1] [column_name2] ..."');
            return;
        }
        const fileName = inputParts[1];
        const cols = inputParts.slice(2);
        setColumns(cols);

        try {
            const response = await fetch('http://localhost:5000/api/draw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ file: fileName, columns: cols }),
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setChartData(data.chart_data);
                console.log('Data Fetched Successfully');
            } else {
                console.error('Failed to fetch chart data');
            }
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    return (
        <div>
            <h3>Draw Command</h3>
            <input type="text" value={inputValue} onChange={handleInputChange} ref={inputRef} placeholder="Enter command (e.g., draw file.csv column_name1 column_name2 ...)" />
            <button onClick={handleDraw}>Draw Chart</button>
            {chartData.length > 0 && (
                <div style={{ width: '100%', height: 400 }}>
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
