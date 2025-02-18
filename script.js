document.getElementById("getWeatherBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "7b83e9de98a2701ba5ab881a97ecabdf"; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById("weatherResult").innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: <strong>${data.main.temp}°C</strong></p>
                    <p>Feels like: <strong>${data.main.feels_like}°C</strong></p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Pressure: ${data.main.pressure} hPa</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
                `;
            } else {
                document.getElementById("weatherResult").innerHTML = `<p>❌ City not found. Please try again.</p>`;
            }
        })
        .catch(() => document.getElementById("weatherResult").innerHTML = `<p>⚠ Error retrieving data</p>`);
});