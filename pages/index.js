import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../Components/_App/Header";
import Footer from "../Components/_App/Footer";
import weatherResponse from "../utils/weatherResponse";


export default function Home() {
  const [searchState, setSearchState] = React.useState("");
  let search = searchState;
  const [location, setLocation] = useState("Nothing yet");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  let now = weatherData;
  const [weather, setWeather] = useState(null);


  const router = useRouter();
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");


  function handleChange(event) {
    setSearchState(event.target.value);
  }

  function handleClearSearch(event) {
    search = "";
    setSearchState("");
    handleSubmit(event);
  }


  async function handleSubmit(event) {
    router.push(`/location?search=${search}`);
  }



  return (
    <div class="page-main page-index">
      <Header/>
      <div class="container-fluid home-image" style={{ backgroundImage: `url(/images/banner_back.jpg)` }}>
        <div>
          <img class="home-image-front" />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
