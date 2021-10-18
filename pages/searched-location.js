import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../components/_App/Header";
import UnitSelect from "../components/_App/UnitSelect";
import Current from "../components/Location/Current";
import Daily from "../components/Location/Daily";
import Hourly from "../components/Location/Hourly";
import { Icon, Menu } from "semantic-ui-react";
import { countries } from "../public/countries";
import weatherResponse from "../utils/weatherResponse";
import { parseCookies, setCookie, destroyCookie } from 'nookies';


export default function SearchedLocation({ city, region, country, latitude, longitude, weatherData, units }) {
  let cookies = parseCookies();
  const [unitsState, setUnitsState] = React.useState(units);

  const weather = weatherResponse(weatherData);
  const router = useRouter();


  const i = countries.findIndex(el => el.code === country);
  country = countries[i].name;

  const locationInfo = city + "," + region + "," + country + "," + latitude + "," + longitude;

  setCookie(null, "currentLocation", locationInfo, {
    path: '/',
  })


  let regionAndCountry;
  if (region !== "" && region !== city) {
    regionAndCountry = region + ", "  + country;
  } else {
    regionAndCountry = country;
  }


  return (
    <>
    <div class="page-main">
      <Header units={unitsState} setUnits={setUnitsState} />

      <div class="page-location">
        <div class="location-main">
          <div class="location-results">
            <div class="location-border">
              <div class="row location-top">
                <div class="col-6">
                  <p class="location-city"> {city} </p>
                  <p class="location-country"> {regionAndCountry} </p>
                  <p>  {weather.coordinates} </p>
                  <img class="current-icon" src={`/images/icons/${weather.current.icon}.png`}/>
                  <p class="location-temp"> {`${weather.current.temp[unitsState]}` + String.fromCharCode(176)} </p>
                  <p class="location-data"> {`Feels Like ${weather.current.feelsLike[unitsState]}` + String.fromCharCode(176)} </p>
                </div>

                <div class="col-6">
                  <Current weather={weather} units={unitsState} />
                </div>
              </div>
            </div>

            <div class="location-border">
              <div class="location-buttom">
                <p class="section-title"> HOURLY FORECAST </p>
                <div class="hourly-row">
                  <Hourly weather={weather} units={unitsState} />
                </div>
              </div>
            </div>

            <div class="location-border">
              <div class="location-buttom">
                <p class="section-title"> DAILY FORECAST </p>
                <div class="hourly-row">
                  <Daily weather={weather} units={unitsState} />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="container-fluid footer">

        </div>

      </div>
    </div>
    </>
  );
}

SearchedLocation.getInitialProps = async ({ query: { search } }) => {
  const geoUrl = `https://open.mapquestapi.com/geocoding/v1/address?key=jSNsxG2R1gZVxGcNiVs3YB53STD5yrU3&location=${search}&maxResults=1&thumbMaps=true`;
  const payload = { headers: { "X-Requested-With": "XMLHttpRequest" } };
  const geoResponse = await axios.get(geoUrl, payload);
  const geoData = geoResponse.data.results[0].locations[0];
  const city = geoData.adminArea5;
  const region = geoData.adminArea3;
  const country = geoData.adminArea1;
  const latitude = geoData.latLng.lat;
  const longitude = geoData.latLng.lng;

  const weatherUrl = `https://dans-proxy.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=a27a7e6cb45357aa26387fcbdf4621cd`;
  const weatherResponse = await axios.get(weatherUrl, payload);
  const weatherData = weatherResponse.data;
  return { city, region, country, latitude, longitude, weatherData };
};
