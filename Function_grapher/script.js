const ctx = document.getElementById('functionGraph').getContext('2d');
        let functionGraph = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: 1000}, (_, i) => (i - 500) / 10),
                datasets: [
                    {
                        label: 'f(x) = x^2',
                        data: Array.from({length: 1000}, (_, i) => Math.pow((i - 500) / 10, 2)),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    }
                },
                plugins: {
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'xy'
                        },
                        zoom: {
                            enabled: true,
                            mode: 'xy'
                        }
                    }
                }
            }
        });

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
        }

        function toggleSyntax() {
            const graphContainer = document.getElementById('functionGraph');
            const iframeContainer = document.getElementById('iframeContainer');
            const inputContainer = document.querySelector('.input-container');
            if (iframeContainer.style.display === 'none') {
                iframeContainer.style.display = 'block';
                graphContainer.style.display = 'none';
                inputContainer.style.display = 'none';
            } else {
                iframeContainer.style.display = 'none';
                graphContainer.style.display = 'block';
                inputContainer.style.display = 'block';
            }
        }

        function updateGraph() {
            const input1 = document.getElementById('functionInput').value;
            const input2 = document.getElementById('functionInput2').value;
            const input3 = document.getElementById('functionInput3').value;
            const xScale = document.getElementById('xScale').value || 10;
            const yScale = document.getElementById('yScale').value || 10;
            const labels = Array.from({length: 1000}, (_, i) => (i - 500) / 10);

            const data1 = labels.map(x => {
                try {
                    return math.evaluate(input1, { x });
                } catch (e) {
                    return NaN;
                }
            });

            const data2 = input2 ? labels.map(x => {
                try {
                    return math.evaluate(input2, { x });
                } catch (e) {
                    return NaN;
                }
            }) : [];

            const data3 = input3 ? labels.map(x => {
                try {
                    return math.evaluate(input3, { x });
                } catch (e) {
                    return NaN;
                }
            }) : [];

            if (data1.includes(NaN) || (input2 && data2.includes(NaN)) || (input3 && data3.includes(NaN))) {
                document.getElementById('errorMessage').textContent = 'Invalid function. Please enter a valid function of x.';
                return;
            } else {
                document.getElementById('errorMessage').textContent = '';
            }

            functionGraph.data.datasets = [
                {
                    label: `f(x) = ${input1}`,
                    data: data1,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }
            ];

            if (input2) {
                functionGraph.data.datasets.push({
                    label: `f(x) = ${input2}`,
                    data: data2,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: false
                });
            }

            if (input3) {
                functionGraph.data.datasets.push({
                    label: `f(x) = ${input3}`,
                    data: data3,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    fill: false
                });
            }

            functionGraph.options.scales.x.min = -xScale;
            functionGraph.options.scales.x.max = xScale;
            functionGraph.options.scales.y.min = -yScale;
            functionGraph.options.scales.y.max = yScale;

            functionGraph.update();
        }

        function resetGraph() {
            document.getElementById('functionInput').value = '';
            document.getElementById('functionInput2').value = '';
            document.getElementById('functionInput3').value = '';
            document.getElementById('xScale').value = '';
            document.getElementById('yScale').value = '';
            document.getElementById('errorMessage').textContent = '';

            functionGraph.data.datasets = [
                {
                    label: 'f(x) = x^2',
                    data: Array.from({length: 1000}, (_, i) => Math.pow((i - 500) / 10, 2)),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }
            ];

            functionGraph.options.scales.x.min = -10;
            functionGraph.options.scales.x.max = 10;
            functionGraph.options.scales.y.min = -10;
            functionGraph.options.scales.y.max = 10;

            functionGraph.update();
        }