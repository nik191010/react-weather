import React from 'react';

import './Weather.scss';
import Icons from '../../assets/icons';

const Weather = (data) => {
  const [cTemp, setCTemp] = React.useState(0);
  const [fTemp, setFTemp] = React.useState(0);
  const [convert, setConvert] = React.useState(true);
  const [city, setCity] = React.useState('');
  const [descriptionId, setDescriptionId] = React.useState('');
  const [feelsLike, setFeelsLike] = React.useState(0);
  const [feelsLikeF, setFeelsLikeF] = React.useState(0);
  const [humidity, setHumidity] = React.useState(0);
  const [wind, setWind] = React.useState(0);
  const [windMeter, setWindMeter] = React.useState(0);
  const [mode, setMode] = React.useState('light');

  React.useEffect(() => {
    setCTemp(data.main.temp.toFixed());
    setFTemp(((data.main.temp * 9) / 5 + 32).toFixed());
    setCity(data.name + ', ' + data.sys.country);
    setDescriptionId(data.weather[0].id);
    setFeelsLike(data.main.feels_like.toFixed());
    setFeelsLikeF(((data.main.feels_like * 9) / 5 + 32).toFixed());
    setHumidity(data.main.humidity);
    setWind(data.wind.speed.toFixed());
    setWindMeter((data.wind.speed / 2.237).toFixed());
  }, [data]);

  const handleChange = () => {
    setConvert(!convert);
  };

  // Change the app mode(light/dark)
  const onSelectMode = (mode) => {
    setMode(mode);
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Detects users' browser theme the first time the app loads
  React.useEffect(() => {
    // Add a listener to update styles
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => onSelectMode(e.matches ? 'dark' : 'light'));

    // Setups dark/light mode for the first time
    onSelectMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Removes listener
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {});
    };
  }, []);

  return (
    <>
      <div className="weather">
        <div key={Icons(descriptionId)} className="weather__thumb fade-in">
          <i className={`${Icons(descriptionId)} weather__pic`} />
        </div>
        <h2 key={city} className="weather__city fade-in">
          {city}
        </h2>
        <h2 key={convert} className="weather__temp fade-in">
          {convert ? `${cTemp}` : `${fTemp}`}
        </h2>
      </div>

      <div className="desc">
        <div className="desc__block">
          <p className="desc__text">Feels like</p>
          <p key={convert} className="desc__value fade-in">
            {convert ? `${feelsLike} °C` : `${feelsLikeF} °F`}
          </p>
        </div>
        <div className="desc__block">
          <p className="desc__text">Humidity</p>
          <p className="desc__value fade-in">{humidity} %</p>
        </div>
        <div className="desc__block">
          <p className="desc__text">Wind Speed</p>
          <p key={convert} className="desc__value fade-in">
            {convert ? `${windMeter} MPS` : `${wind} MPH`}
          </p>
        </div>
        <a key={convert} href="#" onClick={handleChange} className="desc__block desc__button">
          <span className="fade-in">{convert ? '°F' : '°C'}</span>
        </a>

        {mode === 'dark' ? (
          <a href="#" onClick={() => onSelectMode('light')} className="desc__block desc__button">
            <span className="fade-in">
              <svg
                className={'icons'}
                xmlns="http://www.w3.org/2000/svg"
                width={33}
                viewBox="0 0 24 24"
                fill="#f1e408">
                <rect fill="none" />
                <path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
              </svg>
            </span>
          </a>
        ) : (
          <a href="#" onClick={() => onSelectMode('dark')} className="desc__block desc__button">
            <span className="fade-in">
              <svg
                className={'icons'}
                xmlns="http://www.w3.org/2000/svg"
                width={33}
                viewBox="0 0 24 24"
                fill="#f1e408">
                <rect fill="none" height="24" width="24" />
                <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
              </svg>
            </span>
          </a>
        )}
      </div>
    </>
  );
};

export default Weather;
