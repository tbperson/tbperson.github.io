let api_key = "e5250a755143b7c2a8a9d80266a3ae77";

        async function fetchData(city = null) {
            if (!city) {
                city = document.getElementById('location').value;
            }
            try {
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
                if (!weatherResponse.ok) {
                    throw new Error('City not found');
                }
                const weatherData = await weatherResponse.json();
                
                const latitude = weatherData.coord.lat;
                const longitude = weatherData.coord.lon;
                
                const forecastResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
                if (!forecastResponse.ok) {
                    throw new Error('Forecast data not available');
                }
                const forecastData = await forecastResponse.json();
                const forecastResponse2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=relative_humidity_2m`);
                if (!forecastResponse2.ok) {
                    throw new Error('Forecast data not available');
                }
                const forecastData2 = await forecastResponse2.json();
                
                const combinedData = {
                    weatherData,
                    forecastData,
                    forecastData2,
                };
                
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

                // Create the chart for graph1
                const ctx1 = document.getElementById('weatherChart').getContext('2d');
                const labels1 = forecastData.hourly.time.map(time => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                const data1 = {
                    labels: labels1,
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: forecastData.hourly.temperature_2m,
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
                const labels2 = forecastData2.hourly.time.map(time => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                const data2 = {
                    labels: labels2,
                    datasets: [{
                        label: 'Humidity (%)',
                        data: forecastData2.hourly.relative_humidity_2m,
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