import React, { Component } from 'react';
import Weather from './Weather';

// // Create a new project and create simple page displaying your position by using Position component. 

export default class Position extends Component {
    constructor() {
        super();
        this.state = {
            lat: 0,
            lng: 0,
            isLoaded: false
        }
    }

    componentDidMount() {
        if (navigator.geolocation) {
            // Tämä komento lähtee hakemaan asynkronisesti paikkaa:
            navigator.geolocation.getCurrentPosition(position => {
                // päivitetään tilamuuttujat siten, että laiteaan koordinaatit kohdalleen
                this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                isLoaded: true
            });
                console.log("Paikka löydetty");
            },(error) => {
                alert(error.message);
            })
        } else {
            alert("Geolocation disabled!")
        }
        console.log("ComponentDidMount suoritettu loppuun")
    }


    render() {
        const {lat,lng,isLoaded} = this.state;

        if (isLoaded) {
          return (
            <div>
                <h2>Your position is</h2>
                <p>Position: {lat.toFixed(3)}, {lng.toFixed(3)}</p>
                <Weather lat={lat} lng={lng} />
            </div>
          )
        }
        else {
            return (<p>Loading...</p>)
        }
    }
}
