import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Icon } from "semantic-ui-react";
import UnitSelect from "./UnitSelect";
import UnitSelectSmall from "./UnitSelectSmall";
import SearchBar from "./SearchBar";
import Favorites from "./Favorites";
import FavoritesSmall from "./FavoritesSmall";


function Header({ units, setUnits }) {
  const router = useRouter();

  const smallScreen = isSmallScreen();

  function isSmallScreen() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (windowSize.width < 768) {
      return true;
    } else {
      return false;
    }
  }
  

  return (
    <div>
      {smallScreen ? (
        <div class="row header">
          <div class="col-3">
            <a href="/">
              <img class="logo" src="/images/logo8.png" />
            </a>
          </div>

          <div class="col-6">
            <div class="search-div">
              <SearchBar/>
            </div>
          </div>

          {router.pathname.startsWith("/location") ? (
            <div class="col">
              <div>
                <UnitSelectSmall units={units} setUnits={setUnits} />
              </div>
            </div>
          ) : (
            <> </>
          )}
        </div>

      ) : (

        <div class="row header">
          <div class="col-xl-2 col-lg-2 col-md-3 col-sm-3">
            <a href="/">
              <img class="logo" src="/images/logo8.png" />
            </a>
          </div>

          <div class="col-xl-8 col-lg-7 col-md-6 col-sm-4">
            <div class="search-div">
              <SearchBar/>
            </div>
          </div>

          {router.pathname.startsWith("/location") ? (
            <div class="col-xl col-lg col-md col-sm">
              <div>
                <UnitSelect units={units} setUnits={setUnits} />
              </div>
            </div>
          ) : (
            <> </>
          )}
        </div>
      )}


      <div class="row favorites-row">
        {smallScreen ? (
          <FavoritesSmall/>
        ) : (
          <Favorites/>
        )}
      </div>

    </div>

  );
}

export default Header;
