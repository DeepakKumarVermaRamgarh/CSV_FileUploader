# CSV File Uploader and Viewer

This is a web application that allows users to upload CSV files, view the uploaded files, and preview the data within the files. The application is built with Node.js and Express, and it provides a simple and user-friendly interface for managing CSV data.

## Features

- CSV file upload: Users can upload CSV files with a simple web form.
- View a list of uploaded files
- CSV parsing: The application parses the CSV data and displays it in a table.
- Preview the data within uploaded files
- Searching: Users can search data in the table.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/csv-file-uploader.git
   ```

2. Install dependencies:

   cd csv-file-uploader
   npm install

3. Set up the database:

   Make sure you have MongoDB installed and running.
   Update the database configuration in config/mongoose.js if necessary.

4. Start the server:
   npm start

   The server will start running on http://localhost:4000.

## Usage

Access the web application by opening http://localhost:4000 in your web browser.

- Home Page:
  Upload CSV files by selecting the file and clicking the "Upload" button.
  View the list of uploaded files.
- Preview Page:
  Click on the "Preview" button next to a file to view the data within the file.

## Folder Structure

CSV_UPLOADER/
|── |assets/
│ | ├── css/
│ │ | ├── home.css
| | | ├── nav-bar.css
| | | ├── preview_file.css
│ | ├── js/
│ | ├── home.js
│ | ├── preview_file.js
├── config/
│ └── mongoose.js
├── controllers/
│ ├── fileController.js
│ └── homeController.js
├── middlewares/
│ ├── catchAsyncError.js
│ ├── Error.js
│ └── ErrorMiddleware.js
├── models/
│ └── fileModel.js
├── routes/
│ └── index.js
├── views/
│ ├── home.ejs
│ └── layout.ejs
│ └── preview_file.ejs
├── uploads/
│ ├── files/
├── .gitignore
├── package.json
├── README.md
└── index.js

- assets/: Contains CSS and JavaScript files for styling and client-side functionality.
- config/: Contains the Mongoose configuration file.
- controllers/: Contains the controller functions for handling different routes.
- middlewares/: Contains custom middleware functions.
- models/: Contains the Mongoose model definition.
- routes/: Contains the route definitions.
- views/: Contains the EJS templates for rendering HTML pages.
- package.json: Project dependencies and scripts.
- README.md: Documentation file (you're currently reading it!).
- index.js: Entry point for starting the server.

## Dependencies

- express
- express-ejs-layouts
- mongoose
- multer

Feel free to modify and customize the README file according to your specific requirements and additional information you want to provide.

## Screenshots
