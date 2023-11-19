import React from 'react';
import axios from 'axios';
import './scss/libs/weather-icons.scss';

import Weather from './components/Weather';
import Search from './components/Search';

function App() {
  const [data, setData] = React.useState({});
  const [location, setLocation] = React.useState('');
  const [lat, setLat] = React.useState(0);
  const [long, setLong] = React.useState(0);
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const url = `${process.env.REACT_APP_API_WEATHER_URL}/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_WEATHER_KEY}`;
  const urlCoords = `${process.env.REACT_APP_API_WEATHER_URL}/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_API_WEATHER_KEY}`;

  // Gets users' geolocation
  React.useEffect(() => {
    // navigator.geolocation.getCurrentPosition((position) => {
    //   setLat(position.coords.latitude);
    //   setLong(position.coords.longitude);
    // });
    const getIp = async () => {
      let locationInfo;

      try {
        const response = await axios('https://ipinfo.io/json?token=dfca699a151841');
        const data = await response.data;
        console.log(data);
        locationInfo = data.loc;
      } catch (error) {
        alert('Failed to get latitude/longitude');
        console.error(error);
      }
      const splitLocationData = locationInfo.split(',');
      setLat(splitLocationData[0]);
      setLong(splitLocationData[1]);
      console.log(splitLocationData);
    };
    getIp();
  }, []);

  // Gets the data from an "openweather" server using the url and the coordinates
  React.useEffect(() => {
    const fetchData = async () => {
      if (lat && long) {
        try {
          setLoading(true);
          const response = await axios(urlCoords);
          const data = await response.data;
          setData(data);
          setLoading(false);
        } catch (error) {
          alert('Failed to load resource');
          console.error(error);
          setError(error);
          setLoading(false);
        }
        setLocation('');
      }
    };
    fetchData();
  }, [lat, long]);

  // Data fetch function
  const fetchRequest = (url) => {
    try {
      setLoading(true);
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLoading(false);
    } catch (error) {
      alert('Failed to load resource');
      console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  // Gets the data when a user uses the search field and presses the "Enter" button
  const searchLocation = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      fetchRequest(url);
      setLocation('');
    }
  };

  // Gets the data when a user uses the search field and presses the "Search" button
  const submitLocation = (e) => {
    e.preventDefault();
    fetchRequest(url);
    setLocation('');
  };

  // Gets the name of a city when the input is changed
  const getCityName = (city) => {
    setLocation(city);
  };

  // Gets the coordinates of a city when the input is changed
  const getCityCoords = (coords) => {
    setLat(coords[1]);
    setLong(coords[0]);
  };

  if (error) {
    return <div>Some error occurred...</div>;
  }

  return (
    <div className="wrapper">
      <main className="main">
        <div className="container">
          <div className="main-block">
            {loading || !data ? (
              <div className="app">Loading...</div>
            ) : (
              <>
                <Search
                  location={location}
                  getCityName={getCityName}
                  getCityCoords={getCityCoords}
                  searchLocation={searchLocation}
                  submitLocation={submitLocation}
                />
                {typeof data.main !== 'undefined' ? <Weather {...data} /> : <div></div>}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
