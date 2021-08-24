export default function Hourly({ weather, units }) {

  // function mapHourlyData(hourly) {
  //   return hourly.map(h => (
  //     <div class="row">
  //       <div class="col-4 daily-data">
  //         <p> {`${h.time}`} </p>
  //       </div>
  //       <div class="col-4 daily-data">
  //         <img class="daily-icon" src={`/images/icons2/${h.icon}.png`}/>
  //       </div>
  //       <div class="col-4 daily-data">
  //         <p> {`${h.temp}` + String.fromCharCode(176)} </p>
  //       </div>
  //     </div>
  //   ));
  // };


  function mapHourlyData(hourly) {
    return hourly.map(h => (
      <div class="col hourly-col">
        <p class="hourly-data"> {`${h.time}`} </p>
        <img class="daily-icon" src={`/images/icons2/${h.icon}.png`}/>
        <p class="daily-data"> {`${h.temp[units]}` + String.fromCharCode(176)} </p>
      </div>
    ))
  }


  return (
    <div class="row hourly-row-inner">
      {mapHourlyData(weather.hourly.slice(0, 8))}
    </div>
  )
};
