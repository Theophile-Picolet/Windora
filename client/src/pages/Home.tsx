import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardAlert from "../components/CardAlert";
import Cardhours from "../components/Cardhours";
import MainCard from "../components/MainCard";
import { useWeather } from "../components/WeatherContext";

import WeekTemp from "../components/WeekTemp";

export default function Home() {
  const { weatherData, setWeatherData, setWeatherDays, weatherDays } =
    useWeather();

  const location = useLocation();
  const apiKey = import.meta.env.VITE_API_KEY;

  // mise à jour avec ville favorite choisie depuis les favoris

  useEffect(() => {
    if (location.state?.selectedCity) {
      const selectedCity = location.state.selectedCity;
      setWeatherData(selectedCity);
      // requete pour récupérer et recharger les données
      if (!selectedCity.list) {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.coord.lat}&lon=${selectedCity.coord.lon}&units=metric&lang=fr&appid=${apiKey}`,
          )
          .then((response) => {
            setWeatherDays(response.data.list);
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération des données météo :",
              error,
            );
          });
      } else {
        setWeatherDays(selectedCity.list);
      }
    }
  }, [location, setWeatherData, setWeatherDays]);

  if (!weatherData.name || !weatherDays) {
    return (
      <>
        <div className="title-main-card">Cherchez une ville !</div>
      </>
    );
  }

  return (
    <>
      <MainCard />
      <CardAlert />
      <div className="container-hours">
        {weatherDays.slice(0, 9).map((day) => (
          <Cardhours key={day.dt_txt} day={day} />
        ))}
      </div>
      <WeekTemp />
    </>
  );
}
