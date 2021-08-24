export default function Current({ weather, units }) {
  return (
    <div class="location-current">
      <div class="row location-row">
        <div class="col-6">
          <p class="location-field"> SUNRISE </p>
          <p class="location-data"> {`${weather.current.sunrise}`} </p>
        </div>
        <div class="col-6">
          <p class="location-field"> SUNSET </p>
          <p class="location-data"> {`${weather.current.sunset}`} </p>
        </div>
      </div>

      <div class="row location-row">
        <div class="col-6">
          <p class="location-field"> CHANCE OF RAIN </p>
          <p class="location-data"> {`${(weather.current.chanceOfRain).toFixed(0)} %`} </p>
        </div>
        <div class="col-6">
          <p class="location-field"> PRECIPITATION </p>
          <p class="location-data"> {`${weather.current.precipitation[units]}`} </p>
        </div>

      </div>

      <div class="row location-row">
        <div class="col-6">
          <p class="location-field"> HUMIDITY </p>
          <p class="location-data"> {`${weather.current.humidity} %`} </p>
        </div>
        <div class="col-6">
          <p class="location-field"> DEW POINT </p>
          <p class="location-data"> {`${weather.current.dewPoint[units]}` + String.fromCharCode(176)} </p>
        </div>
      </div>

      <div class="row location-row">
        <div class="col-6">
          <p class="location-field"> WIND </p>
          <p class="location-data"> {`${weather.current.windDeg} ${weather.current.windSpeed[units]}`} </p>
        </div>
        <div class="col-6">
          <p class="location-field"> PRESSURE </p>
          <p class="location-data"> {`${weather.current.pressure} hPa`} </p>
        </div>
      </div>

      <div class="row location-row">
        <div class="col-6">
          <p class="location-field"> VISIBILITY </p>
          <p class="location-data"> {`${weather.current.visibility[units]}`} </p>
        </div>
        <div class="col-6">
          <p class="location-field"> UV INDEX </p>
          <p class="location-data"> {`${weather.current.uvi}`} </p>
        </div>
      </div>
    </div>
  )
};
