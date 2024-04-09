

import React from 'react';

const HelpCommand = () => {
    return (
        <>
            <div>
                <h3>Available commands:</h3>
                <p>List of available commands:</p>
                <ul style={{ listStyleType: 'none', marginLeft: '10px' }} >
                    <li> - help: Show available commands </li>
                    <li> - about: Display information about this CLI</li>
                    <li> - fetch-price : Choose the cryptocurrency and then enter it - Fetch the current price of a specified cryptocurrency</li>
                    <li> - upload: Opens the file explorer to allow uploading csv files only.</li>
                    <li> - draw [file] [columns]: Draws the chart of the specified columns of the file present in the draw-chart directory. </li>
                </ul>
            </div>
        </>
    );
};

export default HelpCommand;

