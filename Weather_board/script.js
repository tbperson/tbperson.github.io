document.addEventListener('DOMContentLoaded', function() {
    const platform = new H.service.Platform({
        apikey: 'XK5A-ktpolhuDh2J_f1bHGYKRC8E_AspFlvBbGC08lU'
    });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(document.getElementById('mapContainer'), defaultLayers.vector.normal.map, {
        center: { lat: 51.5074, lng: -0.1278 }, // London coordinates
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1
    });

    document.getElementById('zoomSlider').addEventListener('input', function() {
        const zoomLevel = this.value;
        map.setZoom(zoomLevel);
        document.getElementById('zoomValue').innerText = zoomLevel;
    });
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    document.getElementById('cityForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Constants
        const city = document.getElementById('cityInput').value;
        const apiKey = 'a2a826deef4e3d52990f039d7ffce1d8';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        
        // Variables
        let hourly_temps = [];
        let hours = [];

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let lat = data.coord.lat;
                let long = data.coord.lon;

                window.globalData = data;

                //Log the latitude and longitude so i can use the knockoff google maps later
                console.log("Coordinates of location" + lat,long);
                console.log(url);

                // Format the time to be similar to other
                const currentTime = new Date();
                const hoursFormatted = currentTime.getHours() % 12 || 12;
                const minutesFormatted = currentTime.getMinutes().toString().padStart(2, '0');
                const ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM';
                const formattedTime = `${hoursFormatted}:${minutesFormatted} ${ampm}`;
                                
                hours.push(formattedTime);
                hourly_temps.push(data.main.temp);

                document.getElementById('location').innerText = `Location: ${data.name}`;
                document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
                document.getElementById('weatherDescription').innerText = `Weather: ${data.weather[0].description}`;
                document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
                document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;

                map.setCenter({ lat: lat, lng: long });
                map.setZoom(10);
            })

        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                const existingForecastDiv = document.getElementById('forecast');
                if (existingForecastDiv) {
                    existingForecastDiv.remove();
                }
                window.globalForecastData = data;

                const forecastDiv = document.createElement('div');
                forecastDiv.id = 'forecast';
                forecastDiv.innerHTML = '<h2>Hourly Forecast</h2>';

                data.list.slice(0, 5).forEach(hourData => {
                    const date = new Date(hourData.dt * 1000);
                    const hour = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const temp = hourData.main.temp;
                    const description = hourData.weather[0].description;

                    hourly_temps.push(temp);
                    hours.push(hour);
                });

                // Log the arrays to console
                console.log('Hourly temperatures:', hourly_temps);
                console.log('Hours:', hours);

                // Create and display the graph
                const ctx = document.createElement('canvas');
                ctx.id = 'weatherChart';
                document.getElementById('graphContainer').appendChild(ctx);

                const weatherChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: hours,
                        datasets: [{
                            label: 'Temperature (°C)',
                            data: hourly_temps,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: false
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                beginAtZero: true
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching forecast data:', error);
                alert('Failed to fetch forecast data. Please try again.');
            });
    });
});
function downloadData() {
        // Download the data to a file
        const data = JSON.stringify(window.globalData);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'weather-data.json';
        a.click();
    }
    function downloadSpreadsheetData() {
        const data = window.globalData;
        const forecastData = window.globalForecastData;

        if (!data || !forecastData) {
            alert('No data available to download.');
            return;
        }

        let csvContent = 'data:text/csv;charset=utf-8,';
        csvContent += 'Location,Temperature (°C),Weather,Humidity (%),Wind Speed (m/s)\n';
        csvContent += `${data.name},${data.main.temp},${data.weather[0].description},${data.main.humidity},${data.wind.speed}\n\n`;

        csvContent += 'Hourly Forecast\n';
        csvContent += 'Time,Temperature (°C),Description\n';

        forecastData.list.slice(0, 5).forEach(hourData => {
            const date = new Date(hourData.dt * 1000);
            const hour = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const temp = hourData.main.temp;
            const description = hourData.weather[0].description;
            csvContent += `${hour},${temp},${description}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'weather-data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    function downloadPlainTextData() {
        const data = window.globalData;
        const forecastData = window.globalForecastData;

        if (!data || !forecastData) {
            alert('No data available to download.');
            return;
        }

        let textContent = `Location: ${data.name}\n`;
        textContent += `Temperature: ${data.main.temp} °C\n`;
        textContent += `Weather: ${data.weather[0].description}\n`;
        textContent += `Humidity: ${data.main.humidity}%\n`;
        textContent += `Wind Speed: ${data.wind.speed} m/s\n\n`;

        textContent += 'Hourly Forecast:\n';
        forecastData.list.slice(0, 5).forEach(hourData => {
            const date = new Date(hourData.dt * 1000);
            const hour = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const temp = hourData.main.temp;
            const description = hourData.weather[0].description;
            textContent += `${hour}: ${temp} °C, ${description}\n`;
        });

        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'weather-data.txt';
        a.click();
    }