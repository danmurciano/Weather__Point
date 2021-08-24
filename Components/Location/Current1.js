export default function Current({ weather }) {
  return (
    <div class="location-current">
      <div class="row location-row">


      </div>

      <div class="row location-row">
        <div class="col">
          <p class="location-field"> PRECIPITATION </p>
          <p class="location-data"> {`${weather.current.precipitation} in`} </p>
        </div>
        <div class="col">
          <p class="location-field"> DEW POINT </p>
          <p class="location-data"> {`${weather.current.dewPoint}` + String.fromCharCode(176)} </p>
        </div>
        <div class="col">
          <p class="location-field"> PRESSURE </p>
          <p class="location-data"> {`${weather.current.pressure} hPa`} </p>
        </div>
        <div class="col">
          <p class="location-field"> VISIBILITY </p>
          <p class="location-data"> {`${weather.current.visibility.toFixed(1)} mi`} </p>
        </div>
        <div class="col">
          <p class="location-field"> UV INDEX </p>
          <p class="location-data"> {`${weather.current.uvi}`} </p>
        </div>
      </div>
    </div>
  )
};
