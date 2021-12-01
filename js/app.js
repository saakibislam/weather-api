const detailsTableField = document.getElementById("detailsTable");
const inputTextField = document.getElementById("inputText");

inputTextField.addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        document.getElementById("search-button").click();
    }
})

// Loading weather detail onClick 
function loadData() {
    const inputText = inputTextField.value;
    inputTextField.value = '';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${process.env.API_TOKEN}`

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
}

// Destrcuturing weather data i.e.; temperature, condition, location
function displayWeather(data) {
    const showWeatherField = document.getElementById("showWeather");
    try {
        const placeName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const weatherCondition = data.weather[0].main;

        showWeatherField.innerHTML = `
            <h1>${placeName}</h1>
            <h1>${temperature}&deg;C</h1>
            <h1>${weatherCondition}</h1>
        `;
        showDetails(data);
        changeBackground(weatherCondition);
    } catch {
        showWeatherField.innerHTML = `
            <h1 style ="text-transform: capitalize">${data.message}</h1>
        `;
        detailsTableField.innerHTML = '';
    }
}

// showing details information in a table
function showDetails(data) {
    detailsTableField.innerHTML = '';
    const table = document.createElement("table");
    table.innerHTML = `
    <tr>
        <td><h3>Maximum Temperature:</h3></td>
        <td><h3>${Math.round(data.main.temp_max - 273.15)}&deg;C</h3></td>
        <td><h3>Minimum Temperature:</h3></td>
        <td><h3>${Math.round(data.main.temp_min - 273.15)}&deg;C</h3></td>
    </tr>   
    <tr>
        <td><h3>Pressure:</h3></td>
        <td><h3>${data.main.pressure} hPa</h3></td>
        <td><h3>Humidity:</h3></td>
        <td><h3>${data.main.humidity}%</h3></td>
    </tr>
    <tr>
        <td><h3>Feels like:</td>
        <td><h3>${Math.round(data.main.feels_like - 273.15)}&deg;C</h3></td>
    </tr>   
    `;
    detailsTableField.appendChild(table);
}

// Changing background according to condition
function changeBackground(weatherCondition) {
    // console.log(weatherCondition);

    const outside = weatherCondition.toLowerCase();
    switch (outside) {
        case 'clouds':
            document.body.style.cssText = `
                background-image: url('/images/clouds.jpg');
                transition: background-image 3s;
            `;
            break;

        case 'haze':
        case 'mist':
            document.body.style.cssText = `
                background-image: url('/images/haze.jpg');
                transition: background-image 3s;
            `;
            break;

        case 'rain':
            document.body.style.cssText = `
                background-image: url('/images/rainy.jpg');
                transition: background-image 3s;
            `;
            break;

        case 'thunderstorm':
            document.body.style.cssText = `
                background-image: url('/images/thunder.jpg');
                transition: background-image 3s;
            `;
            break;

        case 'snow':
            document.body.style.cssText = `
                background-image: url('/images/snowy.jpg');
                transition: background-image 3s;
            `;
            break;

        default:
            document.body.style.cssText = `
                background-image: url('/images/sunny.jpg');
                transition: background-image 3s;
            `;
            break;
    }
}