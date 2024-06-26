import React, { useState, useEffect, useRef } from 'react';
import '../styles/terminal.css';
import HelpCommand from './HelpCommand';
import AboutCommand from './AboutCommand';
import FetchPriceCommand from './FetchPriceCommand';
import UploadCommand from './UploadCommand';
import DrawCommand from './DrawCommand';
import DeleteCommand from './DeleteCommand';

const Terminal = () => {

    const [inputValue, setInputValue] = useState('');
    const [commandHistory, setCommandHistory] = useState([]);
    const [clearIntro, setClearIntro] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [inputValue]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCommandSubmit = (e) => {
        e.preventDefault();

        const sendInput = inputValue.trim().split(' ');
        const command = sendInput[0];

        let newOutput = '';
        switch (command) {
            case 'help':
                newOutput = <HelpCommand />;
                break;
            case 'about':
                newOutput = <AboutCommand />;
                break;
            case 'fetch-price':
                newOutput = <FetchPriceCommand sendInput = {sendInput} />;
                break;
            case 'upload':
                newOutput = <UploadCommand />;
                break;
            case 'draw':
                newOutput = <DrawCommand />;
                break;
            case 'delete':
                newOutput = <DeleteCommand />;
                break;
            case 'clear':
                setCommandHistory('');
                setInputValue('');
                setClearIntro(true);
                break;
            case '':
                break;
            default:
                newOutput = `Command not found: ${command}`;
        }

        setCommandHistory((prevHistory) => [...prevHistory, { inputValue, output: newOutput }]);
        setInputValue('');

        if (command === 'clear' || command === 'Clear') {
            setCommandHistory([]);
        }
    };

    return (
        <>
            <div className='cli'>

                <div className="terminal">

                    {clearIntro ? null : (
                        <div>
                            <h1> Welcome to Command Line Interface - REPL </h1>
                        </div>
                    )}
                    {commandHistory.map(({ inputValue, output }, index) => (
                        <div key={index}>
                            <span>{'> '}</span>
                            <span>{inputValue}</span>
                            <div style={{ marginLeft: '12px' , border: '1px soild white' }} >{output}</div>
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
