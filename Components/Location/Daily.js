export default function Daily({ weather, units }) {

  // function mapDailyData(daily) {
  //   return daily.map(d => (
  //     <div class="row">
  //       <div class="col-2 daily-data">
  //         <p> {`${d.day}`} </p>
  //       </div>
  //       <div class="col-2 daily-data">
  //         <img class="daily-icon" src={`/images/icons2/${d.icon}.png`}/>
  //       </div>
  //       <div class="col-2 daily-data">
  //         <p> {`${d.max}` + String.fromCharCode(176)} </p>
  //       </div>
  //       <div class="col-2 daily-data">
  //         <p> {`${d.min}` + String.fromCharCode(176)} </p>
  //       </div>
  //       <div class="col-2 daily-data">
  //         <p> {`${d.humidity} %`} </p>
  //       </div>
  //       <div class="col-2 daily-data">
  //         <p> {`${d.windDeg} ${d.windSpeed} mph`} </p>
  //       </div>
  //     </div>
  //   ));
  // };

  function mapDailyData(daily) {
    return daily.map(d => (
      <div class="col hourly-col">
        <p class="hourly-data"> {`${d.day}`} </p>
        <img class="daily-icon" src={`/images/icons2/${d.icon}.png`}/>
        <p class="daily-data"> {`${d.max[units]}` + String.fromCharCode(176)} </p>
        <p class="daily-data"> {`${d.min[units]}` + String.fromCharCode(176)} </p>
      </div>
    ))
  }

  return (
    <div class="row hourly-row-inner">
      {mapDailyData(weather.daily)}
    </div>
  )
};
