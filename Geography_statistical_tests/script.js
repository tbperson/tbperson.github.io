 function generateTable() {
            const n = document.getElementById('n-values').value;
            const tbody = document.getElementById('values-table').querySelector('tbody');
            tbody.innerHTML = '';

            for (let i = 0; i < n; i++) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><input type="number" class="x-value"></td>
                    <td><input type="number" class="y-value"></td>
                    <td class="rank-x"></td>
                    <td class="rank-y"></td>
                    <td class="d"></td>
                    <td class="d2"></td>
                `;
                tbody.appendChild(row);
            }
        }

        function calculateSpearmanRank() {
            const xValues = Array.from(document.querySelectorAll('.x-value')).map(input => Number(input.value));
            const yValues = Array.from(document.querySelectorAll('.y-value')).map(input => Number(input.value));

            if (xValues.length !== yValues.length) {
                alert('The number of X and Y values must be the same.');
                return;
            }

            const n = xValues.length;
            const rankX = getRanks(xValues);
            const rankY = getRanks(yValues);

            let dSum = 0;
            for (let i = 0; i < n; i++) {
                const d = rankX[i] - rankY[i];
                const d2 = Math.pow(d, 2);
                dSum += d2;

                document.querySelectorAll('.rank-x')[i].innerText = rankX[i];
                document.querySelectorAll('.rank-y')[i].innerText = rankY[i];
                document.querySelectorAll('.d')[i].innerText = d;
                document.querySelectorAll('.d2')[i].innerText = d2;
            }

            const spearmanRank = 1 - ((6 * dSum) / (n * (n * n - 1)));
            document.getElementById('result').innerText = `Spearman's Rank Correlation Coefficient: ${spearmanRank.toFixed(3)}`;
        }

        function getRanks(arr) {
            const sorted = [...arr].sort((a, b) => a - b);
            return arr.map(v => sorted.indexOf(v) + 1);
        }

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const sunIcon = document.querySelector('.toggle-dark-mode .sun');
            const moonIcon = document.querySelector('.toggle-dark-mode .moon');
            if (document.body.classList.contains('dark-mode')) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        }

        function showSpearman() {
            document.getElementById('spearman-section').style.display = 'block';
            document.getElementById('chi-square-section').style.display = 'none';
        }

        function showChiSquare() {
            document.getElementById('spearman-section').style.display = 'none';
            document.getElementById('chi-square-section').style.display = 'block';
        }

        function generateChiSquareTable() {
            const rows = document.getElementById('rows').value;
            const columns = document.getElementById('columns').value;
            const thead = document.getElementById('chi-square-table').querySelector('thead');
            const tbody = document.getElementById('chi-square-table').querySelector('tbody');

            thead.innerHTML = '<tr>' + '<th></th>'.repeat(columns) + '</tr>';
            tbody.innerHTML = '';

            for (let i = 0; i < rows; i++) {
                const row = document.createElement('tr');
                row.innerHTML = '<td><input type="number" class="observed-value"></td>'.repeat(columns);
                tbody.appendChild(row);
            }
        }

        function calculateChiSquare() {
            const observedValues = Array.from(document.querySelectorAll('.observed-value')).map(input => Number(input.value));
            const rows = document.getElementById('rows').value;
            const columns = document.getElementById('columns').value;

            if (observedValues.length !== rows * columns) {
                alert('The number of observed values must match the table dimensions.');
                return;
            }

            const rowSums = Array(rows).fill(0);
            const columnSums = Array(columns).fill(0);
            let totalSum = 0;

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    const value = observedValues[i * columns + j];
                    rowSums[i] += value;
                    columnSums[j] += value;
                    totalSum += value;
                }
            }

            let chiSquare = 0;
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    const expectedValue = (rowSums[i] * columnSums[j]) / totalSum;
                    const observedValue = observedValues[i * columns + j];
                    chiSquare += Math.pow(observedValue - expectedValue, 2) / expectedValue;
                }
            }

            document.getElementById('chi-square-result').innerText = `Chi-Square Value: ${chiSquare.toFixed(3)}`;
        }

        // Show Spearman's Rank section by default
        showSpearman();