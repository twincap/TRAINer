const API_KEY = '415565754e7477693436474556414c'; // API 키
        const BASE_API_URL = `http://swopenAPI.seoul.go.kr/api/subway/${API_KEY}/json/realtimeStationArrival/0/5/`;
        
        // API 호출 함수
        async function fetchData(stationName) {
            try {
                const requestUrl = `${BASE_API_URL}${encodeURIComponent(stationName)}`;///encode 어쩌구 없어도 됨
                console.log('Request URL:', requestUrl);

                const response = await fetch(requestUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched Data:', data);
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        }

        document.getElementById('searchButton').addEventListener('click', async function () {
            const stationName = document.getElementById('input_stnName').value;

            try {
                const result = await fetchData(stationName);
                displayResult(result);
            } catch (error) {
                document.getElementById('result').innerText = '데이터를 가져오는 데 실패했습니다: ' + error.message;
            }
        });

        function displayResult(data) {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = ''; // 이전 결과 초기화

            if (data.realtimeArrivalList) {
                const arrivals = data.realtimeArrivalList;

                if (arrivals.length > 0) {
                    arrivals.forEach(arrival => {
                        const stationInfo = document.createElement('div');
                        stationInfo.className = 'station';
                        stationInfo.innerHTML = `<strong>${arrival.trainLineNm}</strong>: ${arrival.arrivalMsg} (${arrival.arrivalTime}초 후 도착)`;
                        resultDiv.appendChild(stationInfo);
                    });
                } else {
                    resultDiv.innerText = '해당 역의 정보가 없습니다.';
                }
            } else {
                resultDiv.innerText = '데이터를 가져오는 데 문제가 발생했습니다.';
            }
        }