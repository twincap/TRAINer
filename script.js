document.addEventListener('DOMContentLoaded', () => {
    const stationSelect = document.getElementById('station');
    const refreshButton = document.getElementById('refresh');
    const statusDiv = document.getElementById('status');

    // Function to fetch subway data
    async function fetchSubwayData(station) {
        try {
            // Replace with your actual API URL and API Key
            const API_KEY = '415565754e7477693436474556414c';
            const API_URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/xml/CardSubwayStatsNew/1/5/20220301`;


            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            displayStatus(data);
        } catch (error) {
            statusDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        }
    }

    // Function to display subway status
    function displayStatus(data) {
        if (data && data.length > 0) {
            const html = data.map(train => `
                <div class="train-info">
                    <p><strong>Train:</strong> ${train.trainNumber}</p>
                    <p><strong>Status:</strong> ${train.status}</p>
                    <p><strong>Next Station:</strong> ${train.nextStation}</p>
                </div>
            `).join('');
            statusDiv.innerHTML = html;
        } else {
            statusDiv.innerHTML = '<p>No trains available at the moment.</p>';
        }
    }

    // Event listener for refresh button
    refreshButton.addEventListener('click', () => {
        const station = stationSelect.value;
        statusDiv.innerHTML = '<p>Loading...</p>';
        fetchSubwayData(station);
    });
});
