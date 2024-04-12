
# CLI REPL

A front-end CLI REPL (Read-Eval-Print Loop) is a tool that allows you to interactively enter commands or code snippets, which are then executed, and the results are displayed in real time.

## Setting up the project

  **1. Creating a React application:**

  **Setting up the Fronted**
  
  Use the following command to create a new React project using Vite with the React template.
  - npm create vite@latest
  - Select the following options:
  - Project name: cli-repl
  - Framework: React
  - Variant: JavaScript + SWC

  Navigate to project directory:
  - cd cli-repl

  Installation of node modules:
  - npm install

  Start the development server:
  - npm run dev

  **Setting up the Backend**

  - Created a folder in the root of react project
  - The name of the folder is flask-backend
  - Inside this folder there is app.py, requirements.txt and draw-chart directory
  - app.py has compplete backend code for the routes
  - draw-chart directory acts as database

  **Installation of Flask, Flask Cors and Pandas**

  - pip install -r requiremnets.txt
  - before installing requirements, make sure you have Python installed
  - For Virtual Environment
      - Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass // only once if no permisiion
      - python -m venv venv
      - venv\Scripts\Activate
      - deactivate // deactivate the venv
      - Set-ExecutionPolicy -Scope Process -ExecutionPolicy Restricted // To restrict the premisiion again

  - Now, the project is set up and running. Now lets start working on implementing the CLI REPL functionality.

  **Folder Structure**
  
  - components: Contains React components for the CLI REPL in the src folder.
      - Home.jsx
      - Terminal.jsx
      - AboutCommand.jsx
      - HelpCommad.jsx
      - FetchPriceCommand.jsx
      - UploadCommand.jsx
      - DrawCommand.jsx
      - DeleteCommand.jsx
  - styles: Contains CSS files for styling the components, present in the src/styles.
      - terminal.css
  - Home is rendering in App.jsx and Terminal is rendering is Home
  - Remaining all are rendering in Terminal with in a switch case
  - The command is choose on the basis of what user enters


  **2. Basic Terminal UI**
  
  **Component Setup**
  
  - Terminal Component: Created a Terminal component with an input field and an output area to resemble a CLI.

  **const Terminal = () => { // Component logic };**
  
  - Input Handling: Implemented basic input handling to allow users to type commands into the input field.
  
  **Styling**
  
  - Styled the Terminal component using CSS to match the look and feel of a traditional CLI.
  - Set the font-family to Arial, sans-serif for consistency.
  
  **Input Focus**
  
  - Added functionality to automatically focus on the input field when the Terminal component is rendered, allowing users to start typing commands immediately.
  - Command Execution: Implement logic to execute commands and display results.
  - Command History: Maintain a history of executed commands and their results.
  - Error Handling: Handle invalid commands and display error messages.
  - Enhanced Styling: Improve the styling for a more visually appealing interface.

  
  **3. Implement Help and About Commands**
  
  **Tasks Completed**
  
  - Created HelpCommand.jsx and AboutCommand.jsx components.
  - Implemented basic rendering of help and about information.
  - Added command routing in the Terminal component.
  - Parsed user input to determine which command component to render.
  - Displayed help and about information based on user input.
  - Added scrolling behavior using useRef to automatically show the input area when it's out of view.
  - Added screen clear functionality for a clean slate on "clear" command.
  - Included a background image for visual appeal.
  
  **Project Files**
  
  - HelpCommand.jsx: Component for displaying help information.
  - AboutCommand.jsx: Component for displaying about information.
  
  **Implementation Details**
  
  - Utilized React hooks such as useState, useEffect, and useRef for managing state and implementing scrolling behavior.
  - Used switch case statements to determine the type of command and render the appropriate component or output message.
  - Added conditional rendering to show or hide the welcome message based on the clearIntro state.
  
  **4. Implement Fetch Price Command**
  
  **FetchPriceCommand** 

  - Create FetchPriceCommand.jsx component.
  - Implement basic rendering of fetch price functionality.
  
  **Integrate with Binance API.**
  
  - Use fetch to fetch cryptocurrency prices from the Binance API.
  - Display the fetched price in the output area.
  - Command: fetch-price [pair]
  
  **Description:**
  - Fetches the current average price of a specified cryptocurrency pair. Replace [pair] with the desired symbol.
  - API: https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT
  - Output: The current price of [pair] is [price]
  - Example: fetch-price BTCUSDT


  **5. Implement Upload, Draw and Delete Commands**
    ***Involves both Frontend and Backend***

  **Frontend Tasks:**
  
  **Upload**
  
  The Upload Command component allows users to upload a CSV file to the server for further processing.
  
  Usage
  - Input: Select a CSV file using the file input field.
  - Action: Click the "Upload File" button to upload the file.
  - Output: A message indicating whether the file was successfully uploaded or if there was an error.

  Checks
  - Only .csv files can be uploaded
  - Changes the name of the file first i.r., to small letters and replace spaces with hyphes
  - if file already exist then, replace it
  - if no draw-chart directory, then create directory first
    
  Implementation
  - The component uses state to manage the selected file and the message displayed.
  - It sends a POST request to the backend endpoint /api/upload with the selected file in the request body.
  - Upon successful upload, it updates the message state to display a success message.
  - If there is an error, it updates the message state to display an error message.
  
  **Draw:**
  
  The Draw Command component allows users to draw a chart based on the uploaded CSV file and specified columns.
  
  Usage
  - Input: Enter the column names for X and Y axes in the input fields.
  - Action: Click the "Draw Chart" button to draw the chart.
  - Output: A chart displayed in the output area based on the specified columns.

  Checks
    - Checks whether the file exists in the draw-chart directory
    - If no file, then error message
    - Also checks the columns name in the file for their existance
  
  Implementation
  - The component uses state to manage the column names for X and Y axes and the chart data.
  - It sends a POST request to the backend endpoint /api/draw with the selected columns in the request body.
  - Upon successful chart drawing, it displays the chart in the output area.
  - If there is an error, it displays an error message in the output area.

  **Delete:**
  
  The Delete Command component allows users to delete a file from the server's draw-chart directory by providing the file name.
  
  Usage
  - Input: Enter the file name in the input field.
  - Action: Click the "Delete File" button to delete the file.
  - Output: A message indicating whether the file was successfully deleted or if there was an error.

  Checks
    - Checks whether the file exists in the draw-chart directory
    - If no file, then error message
    - If yes, then delete
  
  Implementation
  - The component uses state to manage the file name input and the message displayed.
  - It sends a POST request to the backend endpoint /api/delete with the file name in the request body.
  - Upon successful deletion, it updates the message state to display a success message.
  - If there is an error, it updates the message state to display an error message.
  
  **Backend Tasks:**

  **Upload Endpoint:**
  
  The Upload endpoint allows clients to upload a CSV file to the server for processing.
  
  Route
  - Method: POST
  - URL: /api/upload
  Request
  - Body: Form data with the key file containing the uploaded file.
  Response
  - Success: 200 OK with a JSON object containing a success message.
  - Failure: 400 Bad Request with a JSON object containing an error message.
  Example
  - Request: Form data with the uploaded CSV file.
  - Response: { "message": "File uploaded successfully." }
  
  **Draw Endpoint:**
  
  The Draw endpoint allows clients to draw a chart based on the uploaded CSV file and specified columns.
  
  Route
  - Method: POST
  - URL: /api/draw
  Request
  - Body: JSON object with the keys file containing the uploaded file name, xAxis containing the X-axis column name, and yAxis containing the Y-axis column name.
  Response
  - Success: 200 OK with a JSON object containing the chart data.
  - Failure: 400 Bad Request with a JSON object containing an error message.
  Example
  - Request: { "file": "example.csv", "xAxis": "column1", "yAxis": "column2" }
  - Response: { "chartData": [...] }
  
  **Delete Endpoint:**
  
  The Delete endpoint allows clients to delete a specified file from the server's draw-chart directory.
  
  Route
  - Method: POST
  - URL: /api/delete
  Request
  - Body: JSON object with the key file containing the name of the file to delete.
  Response
  - Success: 200 OK with a JSON object containing a success message.
  - Failure: 400 Bad Request with a JSON object containing an error message.
  Example
  - Request: { "file": "example.csv" }
  - Response: { "message": "example.csv has been deleted successfully." }

  **6. Error Handling and Testing**
  
  Implement error handling.
  - Handle errors gracefully and display error messages to the user.
  Write all the checks for critical functionality.
  - Write checks for command logic and user input handling.

 

  
