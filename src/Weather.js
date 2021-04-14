import React, { Component } from 'react';

// Subscribe to OpenWeather API to get your API key on https://openweathermap.org/api. 
// Create class component under name Weather. There are state variables for showing temperature, wind speed and direction, 
// description of the weather and icon (picture) describing weather. Component will receive latitude and longitude from Position
// component as properties (implemented later on). Use constants to define url for the openweather API and API key. 
// Constans are just convenient way of declaring something in the beginning of the code (so url and API key are easier to find).
// export default class weather extends Component // q=London,uk&appid={apiKey}

const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'f2ea789037fc69b671ffcc790dc1ec70';

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: 0,
            wind_speed: 0,
            wind_direction: 0,
            description: '',
            icon: ''
        }
    }

    // When component is displayed, weather data is retrieved using position (lat and lng).
    // Again, url is constructed by using required parameters (lat, lon, units and apikey).
    // Data is returned as JSON and necessary data is read from available fields. You may observe returned JSON more in details by testing it out on your browser.
    componentDidMount() {
        const url = apiUrl + 
        'lat=' + this.props.lat + 
        '&lon=' + this.props.lng + 
        '&units=metric' + 
        '&appid=' + apiKey;

        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                //console.log(result);
                this.setState({
                    temp: result.main.temp,
                    wind_speed: result.wind.speed,
                    wind_direction: result.wind.deg,
                    description: result.weather[0].description,
                    icon: result.weather[0].icon
                })
            },
            (error) => {
                alert(error);
            }
        )
    }

    // Render method displays values from state variables. Url for the icon is constructed using url, retrieved icon name and postfix. 
    // Console log is just (or was) to test out, that url is correct
    render() {
        const { temp, wind_speed, wind_direction, description, icon } = this.state;
        const icon_url = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
        console.log(icon_url);
        return (
            <div>
                <h2>Weather at your location</h2>
                <p>{temp} C&#176; </p>
                <p>{wind_speed} m/s {wind_direction} degrees</p>
                <p>{description}</p>
                <img src={icon_url} />
            </div>
        )
    }
}
