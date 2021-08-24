import React from 'react';
import { useRouter } from "next/router";
import { Button } from 'semantic-ui-react'
import { parseCookies, setCookie, destroyCookie } from 'nookies';


export default function UnitSelectSmall({ units, setUnits }) {
  const router = useRouter();
  let cookies = parseCookies();

  const [unitsState, setUnitsState] = React.useState(units);


  async function handleSelect(event, value) {
    setUnits(value);
    setUnitsState(value);
    setCookie(null, "units", value, {
      maxAge: 365 * 24 * 3600,
      path: '/',
    })
  }

  console.log(units, unitsState);


  return (
    <div className="units-div">
      <Button.Group size="mini" className="unit-buttons">
        <Button
          color="grey"
          className={unitsState === 0 ? "active-button" : "button" }
          onClick={() => handleSelect(event, 0)}
        >
          {String.fromCharCode(176) + "F"}
        </Button>
        <Button
          color="grey"
          className={unitsState === 1 ? "active-button" : "button" }
          onClick={() => handleSelect(event, 1)}
        >
          {String.fromCharCode(176) + "C"}
        </Button>
      </Button.Group>
    </div>
  );
}
