import React, { useState, useEffect, useRef } from 'react';
import '../styles/terminal.css';

const Terminal = () => {

    const [inputValue, setInputValue] = useState('');
    const [commandHistory, setCommandHistory] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCommandSubmit = (e) => {
        e.preventDefault();
        const command = inputValue.trim().toLowerCase();

        let newOutput = '';
        switch (command) {
            case 'help':
                newOutput = 'List of available commands: \n help - Display this help message \n about - Display information about this REPL';
                break;
            case 'about':
                newOutput = 'This is a simple CLI REPL created using React.';
                break;
            case 'clear':
                setCommandHistory('');
                setInputValue('');
                break;
            case '':
                    break;
            default:
                newOutput = `Command not found: ${command}`;
        }

        setCommandHistory((prevHistory) => [...prevHistory, { command, output: newOutput }]);
        setInputValue('');
    };

    return (
        <>
            <div className='cli'>

                <div className="terminal">
                    <h1> Welcome to Command Line Interface - REPL </h1>
                    {commandHistory.map(({ command, output }, index) => (
                        <div key={index}>
                            <span>{'> '}</span>
                            <span>{command}</span>
                            <div style={{ marginLeft : '12px' }} >{output}</div>
                        </div>
                    ))}

                    <form onSubmit={handleCommandSubmit}>
                        <div className='input-area'>
                            <div className='input-area-sign'> {'> '}</div>
                            <div className='input-area-box'>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                ref={inputRef}
                            />
                        </div>
                        </div>
                    </form>

                </div>

            </div>
        </>
    );
};

export default Terminal;
