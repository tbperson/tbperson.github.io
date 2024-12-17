# Weather Dashboard

## Overview
The Weather Dashboard is a web application that provides real-time weather data for any city. It displays current weather conditions, temperature, humidity, wind speed, and atmospheric pressure. Additionally, it provides hourly forecasts for temperature and humidity.

## Features
- **Real-time Weather Data**: Fetches current weather data for the specified city.
- **Hourly Forecasts**: Displays hourly temperature and humidity forecasts.
- **Interactive Charts**: Uses Chart.js to display temperature and humidity data in a graphical format.
- **Responsive Design**: The layout adjusts to different screen sizes for optimal viewing on any device.

## Libraries and Technologies Used
- **HTML**: The structure of the web application.
- **CSS**: Styling for the web application to ensure a visually appealing interface.
- **JavaScript**: Handles data fetching and dynamic content updates.
- **Chart.js**: A JavaScript library used to create responsive and interactive charts.
- **OpenWeatherMap API**: Provides current weather data.
- **Open-Meteo API**: Provides hourly forecast data for temperature and humidity.

## How It Works
1. **User Input**: The user enters a city name in the input field and clicks the "Get Weather" button.
2. **Data Fetching**: The application fetches current weather data from the OpenWeatherMap API and hourly forecast data from the Open-Meteo API.
3. **Data Display**: The fetched data is displayed in various formats:
    - **Weather Icon**: Displays an icon representing the current weather condition.
    - **Temperature, Feels Like, Humidity, Wind, and Pressure Circles**: Displays current values in a circular format.
    - **Charts**: Displays hourly temperature and humidity data using Chart.js.

## File Structure
- `index.html`: The main HTML file containing the structure of the web application.
- `styles.css`: The CSS file for styling the web application.
- `script.js`: The JavaScript file containing the logic for fetching and displaying weather data.

## Getting Started
1. Clone the repository.
2. Open `index.html` in a web browser.
3. Enter a city name and click "Get Weather" to view the weather data.

## Future Enhancements
- Add support for multiple languages.
- Include additional weather parameters such as UV index and visibility.
- Implement a feature to save favorite cities for quick access.

## License
This project is licensed under the MIT License.