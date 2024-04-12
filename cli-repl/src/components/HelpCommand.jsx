

import React from 'react';

const HelpCommand = () => {
    return (
        <>
            <div>
                <h3>Available commands:</h3>
                <ul style={{ listStyleType: 'none', marginLeft: '10px' }} >
                    <li> - <b> help : </b>  Show available commands </li>
                    <li> - <b> about : </b> Display information about this CLI</li>
                    <li> - <b> fetch-price [coin] : </b> Fetch the current price of a specified cryptocurrency e.g., fetch-price BTCUSDT </li>
                    <li> - <b> upload : </b> Opens the file explorer to allow uploading csv files only.</li>
                    <li> - <b> draw : </b> Firstly write draw and press enter, then write "draw [file.csv] [columns]" in the input field, It draws the chart of the specified columns of the file present in the draw-chart directory. </li>
                    <li> - <b> delete : </b> Firstly write delete, then write "delete [file.csv]" in the input field, It deletes the specified file present in the draw-chart directory. </li>
                </ul>
            </div>
        </>
    );
};

export default HelpCommand;

