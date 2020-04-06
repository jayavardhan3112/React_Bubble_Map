import React, { Component } from 'react';

let data = {
    city: [
        { "name": "Tokyo", "coordinates": [139.6917, 35.6895], "population": 37843000 },
        { "name": "Jakarta", "coordinates": [106.8650, -6.1751], "population": 30539000 },
        { "name": "Delhi", "coordinates": [77.1025, 28.7041], "population": 24998000 },
        { "name": "Seoul", "coordinates": [126.9780, 37.5665], "population": 23480000 },
        { "name": "Shanghai", "coordinates": [121.4737, 31.2304], "population": 23416000 },
        { "name": "Karachi", "coordinates": [67.0099, 24.8615], "population": 22123000 },
        { "name": "Beijing", "coordinates": [116.4074, 39.9042], "population": 21009000 },
        { "name": "Mumbai", "coordinates": [72.8777, 19.0760], "population": 17712000 },
        { "name": "Osaka", "coordinates": [135.5022, 34.6937], "population": 17444000 },
        { "name": "Moscow", "coordinates": [37.6173, 55.7558], "population": 16170000 },
        { "name": "Dhaka", "coordinates": [90.4125, 23.8103], "population": 15669000 },
        { "name": "Bangkok", "coordinates": [100.5018, 13.7563], "population": 14998000 },
        { "name": "Kolkata", "coordinates": [88.3639, 22.5726], "population": 14667000 },
        { "name": "Istanbul", "coordinates": [28.9784, 41.0082], "population": 13287000 },
    ],
    minLat: -6.1751,
    maxLat: 55.7558,
    minLong: 37.6173,
    maxLong: 139.6917
}

export class Cities extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        data: data
      };
    }
    componentDidMount() {
        fetch("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=US", {
            method: 'GET',
            headers: {  
                'X-RapidAPI-Key': 'bd5a22a62dmshbaad7f06d1358fep1e2205jsnb859e0252a95',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result.data.covid19Stats,
                data: result.data.covid19Stats
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
      render() {
        console.log(this.state.data)
        const { error, isLoaded, items } = this.state;
        console.log(items);
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
            return (
                <ul>
                {items.map(item => (
                    <li key={item.id}>
                    {item.city} {item.confirmed}
                    </li>
                ))}
                </ul>
            );
        }
    }
}

export default data;