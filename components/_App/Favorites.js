import React, { Component } from 'react';
import { useRouter } from "next/router";
import { Menu, Button, Icon } from 'semantic-ui-react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';


export default function Favorites() {
  const [activeItem, setActiveItem] = React.useState("London");
  const [page, setPage] = React.useState(0);
  const router = useRouter();
  const cookies = parseCookies();


  let currentLocation;
  let locations = [];
  let length;


  for (const [key, value] of Object.entries(cookies)) {
    if (key === "currentLocation") {
      currentLocation = value;
    } else if (key !== "units") {
      locations.push(value);
      length = locations.length;
    }
  }


// Extends favorites cookies for 1 year everytime this element loads
  locations.map(location => (
    setCookie(null, location, location, {
      maxAge: 365 * 24 * 3600,
      path: '/',
    })
  ))


  async function handleSelect(event, value) {
    router.push(`/location/?search=${value}`);
  }

  function saveLocation() {
    setCookie(null, currentLocation, currentLocation, {
      maxAge: 365 * 24 * 3600,
      path: '/',
    })
    router.reload();
  }

  function removeLocation(event, value) {
    destroyCookie(null, value);
    router.reload();
  }


  function scrollPage(event, value) {
    setPage(page + value);
  }


  function mapFavorites(locations) {
    length = locations.length;
    if (length > 4) {
      locations = locations.slice(page, page + 4);
    }

    return locations.map(location => (
      <Menu.Item className="favorites-menu-item" active={activeItem === location}>
        <Icon name="map marker" color="teal"/>
        <Button className="favorites-menu-button" onClick={() => handleSelect(event, location.replace("|", ", "))}>
          <p className="favorites-city">{location.split("|")[0]} </p>
          <p className="favorites-regionAndCountry">{location.split("|")[1]} </p>
        </Button>
        <Button className="remove-button" onClick={() => removeLocation(event, location)}>
          <Icon name="trash alternate"/>
        </Button>
       </Menu.Item>
    ))
  }


  return (
    <div class="row favorites-menu">
      {locations.length > 0 ? (
        <>
        {page > 0 ? (
          <div class="arrow-col">
            <Button className="arrow-button" basic active="false" onClick={() => scrollPage(event, -1)} >
              <Icon className="carousel-arrow" name="chevron left" size="big" />
            </Button>
          </div>
        ) : (
          <div class="arrow-col">
            <Button className="arrow-button-disabled" basic active="false" >
              <Icon className="carousel-arrow" name="chevron left" size="big" />
            </Button>
          </div>
        )}

        <div class="favorites-locations">
          <Menu pagination inverted className="">
            {mapFavorites(locations)}
          </Menu>
        </div>

        {page < length - 4 ? (
          <div class="arrow-col">
            <Button className="arrow-button" basic active="false" onClick={() => scrollPage(event, 1)} >
              <Icon className="carousel-arrow" name="chevron right" size="big" />
            </Button>
          </div>
        ) : (
          <div class="arrow-col">
            <Button className="arrow-button-disabled" basic active="false" >
              <Icon className="carousel-arrow" name="chevron right" size="big" />
            </Button>
          </div>
        )}
        </>
      ) : (
        <> </>
      )}


      {currentLocation ? (
        <Button className="save-button" onClick={() => saveLocation(event, location)}>
          Save Current
        </Button>
      ) : (
        <> </>
      )}

    </div>
  )
}
