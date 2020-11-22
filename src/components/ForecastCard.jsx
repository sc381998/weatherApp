import React from "react";

const ForecastCard = ({ data }) => {
  function Converter(K) {
    return (K - 273.15).toFixed() + "\xB0C";
  }

  function getDays(myDate) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    myDate = myDate.split(" ")[0];
    return days[new Date(myDate).getDay()].substring(0, 3);
  }

  function getMonths(date) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    date = date.split(" ")[0];
    return months[new Date(date).getMonth()].substring(0, 3);
  }
  function getDayDate(date) {
    date = date.split(" ")[0];
    date = date.split("-");
    return date[2];
  }
  return (
    <>
      <div className="wrapper">
        {!data ? (
          <>
            <h1>5-Days forecast</h1>
          </>
        ) : (
          <>
            <h4 className="text-center">Next 5 Days</h4>
            {data
              .filter((weather, index) => {
                return index % 7 === 1 && index !== 1;
              })
              .map((weather, index) => {
                return (
                  <div key={index} className="column">
                    <div className="row">
                      <div className="col-md-4">
                        {getDays(weather.dt_txt)}, {getMonths(weather.dt_txt)}{" "}
                        {getDayDate(weather.dt_txt)}
                      </div>
                      <div className="d-flex col-md-4">
                        <img
                          className="img-responsive"
                          style={{ width: 40, height: 40 }}
                          alt={weather.dt}
                          src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                        />
                        <div className="celcius">
                          {Converter(weather.main.temp)}
                        </div>
                      </div>
                      <div
                        className="description col-md-4"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {weather.weather[0].description}
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>
    </>
  );
};
export default ForecastCard;
