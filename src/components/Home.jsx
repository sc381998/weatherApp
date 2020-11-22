import React, { useState, useEffect } from "react";
import authService from "./../service/autoService";
import Loading from "./Loading";
import Card from "./Card";
import ForecastCard from "./ForecastCard";
const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Darjeeling");
  // const [error, setError] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({});
  const [fiveDaysWeather, setFiveDaysWeather] = useState([]);
  if (!props.display) {
    props.history.push("/login");
  }

  if (!authService.isLoggedIn()) {
    props.history.push("/login");
  }

  const handleLogout = () => {
    authService.handleLogout(props);
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const apiKey = "df1ed9ede1b196ea291c7c36591793fe";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const response = await fetch(url);

      const newCurrentWeather = await response.json();
      setLoading(false);
      setCurrentWeather(newCurrentWeather);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchForecast = async () => {
    setLoading(true);
    try {
      const apiKey = "df1ed9ede1b196ea291c7c36591793fe";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      const response = await fetch(url);
      const newFiveDaysWeather = await response.json();

      setLoading(false);
      setFiveDaysWeather(newFiveDaysWeather.list);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeather();
    fetchForecast();
  }, [city]);

  return (
    <>
      <div className="container">
        <header className="mt-2">
          <div className="title">
            <h2>Weather App</h2>
            <div className="underline"></div>
            <button className="btn btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        {showAboutUs && (
          <aside>
            <h2>
              About Us Information
              <span
                onClick={() => setShowAboutUs(false)}
                className="cancelEmoji"
                role="img"
                aria-label="cancel"
              >
                ❌
              </span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
              nobis, magni expedita reprehenderit quae error saepe ipsum quasi
              eum impedit at! Sed perferendis nobis, suscipit quia ipsum illum
              hic totam.
            </p>
          </aside>
        )}
        <main>
          <section className="col-md-12">
            <form className="d-flex justify-content-center ">
              <select value={city} onChange={handleChange}>
                <option value="Darjeeling">Darjeeling</option>
                <option value="London">London</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Cape Town">Cape Town</option>
                <option value="Pune">Pune</option>
                <option value="San Francisco">San Francisco</option>
              </select>
            </form>
          </section>
          {loading ? (
            <section>
              <Loading />
            </section>
          ) : (
            <section className="d-flex">
              <Card data={currentWeather} />
              <ForecastCard data={fiveDaysWeather} />
            </section>
          )}
        </main>
        <footer>
          <button className="btn" onClick={() => setShowAboutUs(!showAboutUs)}>
            About Us{" "}
          </button>
        </footer>
      </div>
    </>
  );
};

export default Home;
