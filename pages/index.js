import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../components/_App/Header";
import Footer from "../components/_App/Footer";
import weatherResponse from "../utils/weatherResponse";


export default function Home() {
  const [searchState, setSearchState] = React.useState("");
  let search = searchState;
  const router = useRouter();


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
    <div class="page-index">
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
