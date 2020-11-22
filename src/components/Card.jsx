import React from "react";

const Card = ({ data }) => {
  let { main, sys, weather, wind } = data;
 
  let name = data.name;
  let icon = null;
  let temp = null;
  let description = null;
  let country = null;
  let feelLike = null;
  try {
    icon = weather[0].icon;
    temp = main.temp;
    description = weather[0].description;
    country = sys.country;
    feelLike = main.feels_like;
  } catch (e) {
    country = "IN";
    icon = "02d";
    temp = "37";
    description = "clear sky";
    feelLike = "27";
  }

  function getLocalTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }
  function Converter(K) {
    return (K - 273.15).toFixed();
  }
  function getNumericDay(myDate) {
    return new Date().toLocaleString("default", { day: "numeric" });
  }

  function getMonths() {
    return new Date().toLocaleString("default", { month: "long" });
  }
  return (
    <>
      <div className="wrapper">
        {!name ? (
          <>
            <h1>Current Weather</h1>
            <p></p>
          </>
        ) : (
          <>
            <h6 className="text-danger">
              {getMonths()} {getNumericDay()}
              {","} {getLocalTime()}
            </h6>
            <h5 className="card-title">
              {name}, {country}
            </h5>
            <div className="d-flex justify-content-center">
              <img
                className="img-responsive"
                style={{ width: 100, height: 100 }}
                alt={name}
                src={`https://openweathermap.org/img/w/${icon}.png`}
              />
              <div className="temperature">
                <span>{Converter(temp)}</span>
                {"\xB0C"}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="description">{description}</div>
                <div>Wind: {wind.speed}m/s</div>
                <div>Humidity: {main.humidity}%</div>
              </div>
              <div className="col-md-6">
                <div>
                  Feels like: {Converter(feelLike)}
                  {"\xB0C"}
                </div>
                <div>
                  High: {Converter(main.temp_max)}
                  {"\xB0C"}
                </div>
                <div>
                  Low: {Converter(main.temp_min)}
                  {"\xB0C"}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Card;
