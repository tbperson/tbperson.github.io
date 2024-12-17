let api_key = "e5250a755143b7c2a8a9d80266a3ae77";

        async function fetchData(city = null) {
            // Get the city name from the input field 
            if (!city) {
                city = document.getElementById('location').value;
            }
            try {
                // Fetch the current weather data
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
                if (!weatherResponse.ok) {
                    throw new Error('City not found');
                }

                const weatherData = await weatherResponse.json();
        
                //Get the latitude and longitude from openweathermap, and plug it into open-meteo API to get the forecast data for the graphs
                const latitude = weatherData.coord.lat;
                const longitude = weatherData.coord.lon;
                
                const temperatureForecastResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
                if (!temperatureForecastResponse.ok) {
                    throw new Error('Forecast data not available');
                }
                const temperatureForecastData = await temperatureForecastResponse.json();
                
                const humidityForecastResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=relative_humidity_2m`);
                if (!humidityForecastResponse.ok) {
                    throw new Error('Forecast data not available');
                }
                const humidityForecastData = await humidityForecastResponse.json();
                
                const precipitationForecastResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation`);
                if (!precipitationForecastResponse.ok) {
                    throw new Error('Precipitation data not available');
                }
                const precipitationForecastData = await precipitationForecastResponse.json();
                
                const windForecastResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=wind_speed_10m`);
                if (!windForecastResponse.ok) {
                    throw new Error('Wind speed data not available');
                }
                const windForecastData = await windForecastResponse.json();

                // Collate all of the gathered data into one object
                const combinedData = {
                    weatherData,
                    temperatureForecastData,
                    humidityForecastData,
                    precipitationForecastData,
                    windForecastData
                };
                window.globalCombinedData = combinedData; 
                console.log(combinedData);
    


                // Display the current weather data in circles on a bar at the bottom of the page
                
                const weatherIcon = document.getElementById('weatherIcon');
                const iconCode = weatherData.weather[0].icon;
                weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                weatherIcon.style.display = 'block';

                const temperatureCircle = document.getElementById('temperatureCircle');
                document.getElementById('temperatureValue').innerText = `${weatherData.main.temp}°C`;
                temperatureCircle.style.display = 'flex';

                const feelsLikeCircle = document.getElementById('feels-like-circle');
                document.getElementById('feelsLikeValue').innerText = `${weatherData.main.feels_like}°C`;
                feelsLikeCircle.style.display = 'flex';

                const humidityCircle = document.getElementById('humidityCircle');
                document.getElementById('humidityValue').innerText = `${weatherData.main.humidity}%`;
                humidityCircle.style.display = 'flex';

                const windCircle = document.getElementById('windCircle');
                document.getElementById('windValue').innerText = `${weatherData.wind.speed} m/s`;
                windCircle.style.display = 'flex';

                const pressureCircle = document.getElementById('pressureCircle');
                document.getElementById('pressureValue').innerText = `${weatherData.main.pressure} hPa`;
                pressureCircle.style.display = 'flex';


                // Display the weather projections on graphs
                // Create the chart for graph1
                const ctx1 = document.getElementById('weatherChart').getContext('2d');
                const labels1 = temperatureForecastData.hourly.time.map(time => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                const data1 = {
                    labels: labels1,
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: temperatureForecastData.hourly.temperature_2m,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                    }]
                };
                const config1 = {
                    type: 'line',
                    data: data1,
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Time'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Temperature (°C)'
                                }
                            }
                        }
                    }
                };
                new Chart(ctx1, config1);

                // Create the chart for graph2
                const ctx2 = document.getElementById('humidityChart').getContext('2d');
                const labels2 = humidityForecastData.hourly.time.map(time => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                const data2 = {
                    labels: labels2,
                    datasets: [{
                        label: 'Humidity (%)',
                        data: humidityForecastData.hourly.relative_humidity_2m,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                    }]
                };
                const config2 = {
                    type: 'line',
                    data: data2,
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Time'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Humidity (%)'
                                }
                            }
                        }
                    }
                };
                new Chart(ctx2, config2);
                
                // Create the chart for graph3
                const ctx3 = document.getElementById('precipitationChart').getContext('2d');
                const labels3 = precipitationForecastData.hourly.time.map(time => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                const data3 = {
                    labels: labels3,
                    datasets: [{
                        label: 'Precipitation (mm)',
                        data: precipitationForecastData.hourly.precipitation,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                    }]
                };
                const config3 = {
                    type: 'line',
                    data: data3,
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Time'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Precipitation (mm)'
                                }
                            }
                        }
                    }
                };
                new Chart(ctx3, config3);

                // Create the chart for graph4
                const ctx4 = document.getElementById('windChart').getContext('2d');
                const labels4 = windForecastData.hourly.time.map(time => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                const data4 = {
                    labels: labels4,
                    datasets: [{
                        label: 'Wind Speed (m/s)',
                        data: windForecastData.hourly.wind_speed_10m,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        fill: true,
                    }]
                };
                const config4 = {
                    type: 'line',
                    data: data4,
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Time'
                                }
                            },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Wind Speed (m/s)'
                                }
                            }
                        }
                    }
                };
                new Chart(ctx4, config4);

            } catch (error) {
                document.getElementById('weatherData').innerText = "none";
                document.getElementById('weatherIcon').style.display = 'none';
                document.getElementById('temperatureCircle').style.display = 'none';
                document.getElementById('feels-like-circle').style.display = 'none';
                document.getElementById('humidityCircle').style.display = 'none';
                document.getElementById('windCircle').style.display = 'none';
                document.getElementById('pressureCircle').style.display = 'none';
                document.getElementById('weatherDescription').style.display = 'none';
            }
        }

        window.onload = () => {
            fetchData();
        };




        //Buttons to toggle the visibility of the graphs and circles
        function toggleGraph1() {
            const graph1 = document.getElementById('graph1');
            const button1 = document.getElementById('toggleGraph1Button');
            if (graph1.style.display === 'none') {
                graph1.style.display = 'block';
                button1.style.backgroundColor = 'green';
            } else {
                graph1.style.display = 'none';
                button1.style.backgroundColor = 'red';
            }
        }

        function toggleGraph2() {
            const graph2 = document.getElementById('graph2');
            const button2 = document.getElementById('toggleGraph2Button');
            if (graph2.style.display === 'none') {
                graph2.style.display = 'block';
                button2.style.backgroundColor = 'green';
            } else {
                graph2.style.display = 'none';
                button2.style.backgroundColor = 'red';
            }
        }
        
        function toggleGraph3() {
            const graph2 = document.getElementById('graph3');
            const button2 = document.getElementById('toggleGraph3Button');
            if (graph2.style.display === 'none') {
                graph2.style.display = 'block';
                button2.style.backgroundColor = 'green';
            } else {
                graph2.style.display = 'none';
                button2.style.backgroundColor = 'red';
            }
        }
        
        function toggleGraph4() {
            const graph2 = document.getElementById('graph4');
            const button2 = document.getElementById('toggleGraph4Button');
            if (graph2.style.display === 'none') {
                graph2.style.display = 'block';
                button2.style.backgroundColor = 'green';
            } else {
                graph2.style.display = 'none';
                button2.style.backgroundColor = 'red';
            }
        }

        function toggleCircles() {
            const circleContainer = document.getElementById('circle-container');
            const button = document.getElementById('toggleCirclesButton');
            if (circleContainer.style.display === 'none') {
            circleContainer.style.display = 'flex';
            button.style.backgroundColor = 'green';
            } else {
            circleContainer.style.display = 'none';
            button.style.backgroundColor = 'red';
            }
        }

        function downloadData() {
            const a = document.createElement('a');
            a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(window.globalCombinedData, null, 4));
            a.download = 'weatherData.json';
            a.click();
        }
