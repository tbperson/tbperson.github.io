# JSON to CSV Converter

This project is a simple web-based application with a Matrix/Morpheus theme that allows users to convert JSON data to CSV format and vice versa. The application provides a user-friendly interface with a text area for input and output, and buttons to perform the conversion and toggle between conversion modes.

## Features

- Convert JSON to CSV
- Convert CSV to JSON
- Toggle between conversion modes
- User-friendly interface with real-time conversion

## Usage

1. Open the `index.html` file in a web browser.
2. Paste your JSON or CSV data into the input text area.
3. Click the "Convert" button to perform the conversion.
4. The converted data will appear in the output text area.
5. Use the "Change Convert Mode" button to switch between JSON to CSV and CSV to JSON conversion modes.

## Files

- `index.html`: The main HTML file containing the structure, styles, and JavaScript for the application.

## JavaScript Functions

- `convert()`: Determines the current conversion mode and calls the appropriate conversion function.
- `toggleMode()`: Toggles between JSON to CSV and CSV to JSON conversion modes.
- `convertToCsv()`: Converts JSON input to CSV format.
- `convertToJson()`: Converts CSV input to JSON format.
- `jsonToCsv(jsonArray)`: Helper function to convert a JSON array to CSV format.
- `csvToJson(csv)`: Helper function to convert CSV data to a JSON array.
- `replacer(key, value)`: Helper function to escape double quotes in JSON strings.

## License

This project is licensed under the MIT License.
