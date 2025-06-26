import "../styles/MainCard.css";
import { Flip, ToastContainer, toast } from "react-toastify";
import CurrentDate from "./CurrentDate";
import SvgIcons from "./SvgIcons";
import { useWeather } from "./WeatherContext";

const icons = [
  {
    ressenti: {
      width: "24px",
      height: "24px",
      path: "M396-396q-32-32-58.5-67T289-537q-5 14-6.5 28.5T281-480q0 83 58 141t141 58q14 0 28.5-2t28.5-6q-39-22-74-48.5T396-396Zm57-56q51 51 114 87.5T702-308q-40 51-98 79.5T481-200q-117 0-198.5-81.5T201-480q0-65 28.5-123t79.5-98q20 72 56.5 135T453-452Zm290 72q-20-5-39.5-11T665-405q8-18 11.5-36.5T680-480q0-83-58.5-141.5T480-680q-20 0-38.5 3.5T405-665q-8-19-13.5-38T381-742q24-9 49-13.5t51-4.5q117 0 198.5 81.5T761-480q0 26-4.5 51T743-380ZM440-840v-120h80v120h-80Zm0 840v-120h80V0h-80Zm323-706-57-57 85-84 57 56-85 85ZM169-113l-57-56 85-85 57 57-85 84Zm671-327v-80h120v80H840ZM0-440v-80h120v80H0Zm791 328-85-85 57-57 84 85-56 57ZM197-706l-84-85 56-57 85 85-57 57Zm199 310Z",
    },
    vent: {
      width: "24px",
      height: "24px",
      path: "M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z",
    },
    humidite: {
      width: "24px",
      height: "24px",
      path: "M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Zm0 160q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm-40-140h80v-180h-80v180Z",
    },
    templogo: {
      width: "48px",
      height: "48px",
      path: "M450-770v-150h60v150h-60Zm256 106-42-43 106-106 42 43-106 106Zm64 214v-60h150v60H770Zm1 302L665-254l43-43 106 106-43 43ZM254-664 148-770l42-42 106 106-42 42Zm-14 484h180q33.33 0 56.67-23.26Q500-226.53 500-259.76 500-293 477.24-317q-22.77-24-56.24-24h-44l-18-41q-15.15-35.75-47.6-56.88Q278.95-460 240-460q-58.33 0-99.17 40.76-40.83 40.77-40.83 99Q100-262 140.83-221q40.84 41 99.17 41Zm0 60q-83 0-141.5-58.5T40-320q0-83 58.5-141.5T240-520q57.74 0 105.37 32.5T416-401q60.12 0 101.06 43.59Q558-313.82 558-253q-5 56-44.03 94.5Q474.93-120 420-120H240Zm318-133q-3-15.38-6-30t-6-30q52-20 83-65.54 31-45.54 31-101.32 0-75.14-52.5-127.64T480-660q-67.22 0-117.63 42.67Q311.96-574.65 303-509q-16-3-31.5-5.5T240-520q14-88 82.5-144T480-720q100 0 170 70t70 170.34Q720-402 675.5-340T558-253Zm-77-227Z",
    },
    conditions: {
      width: "24px",
      height: "24px",
      path: "M500-40q-25 0-42.5-17T440-99q0-12 4.5-23t13.5-19l42-39 42 39q9 8 13.5 19t4.5 23q0 25-17.5 42T500-40Zm-138-60-42-42 118-118 42 42-118 118Zm258-60-60-60 60-60 60 60-60 60Zm-360 0-60-60 60-60 60 60-60 60Zm40-160q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z",
    },
  },
];
export default function MainCard() {
  const { weatherData, name, cityData } = useWeather();

  const addToFavorites = () => {
    const currentUser = localStorage.getItem("currentUser") || "Explorateur";
    // Récupérer tous les favoris par utilisateur
    const allUserFavorites = JSON.parse(
      localStorage.getItem("userFavorites") || "{}",
    );

    // Crée un tableau vide pour l'utilisateur s'il n'existe pas
    if (!allUserFavorites[currentUser]) {
      allUserFavorites[currentUser] = [];
    }

    // Vérifier si la ville est déjà dans les favoris de cet utilisateur
    if (
      allUserFavorites[currentUser].some(
        (fav: { name: string }) => fav.name === weatherData.name,
      )
    ) {
      toast.warn("Cette ville est déjà dans vos favoris", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
      return;
    }

    // Ajouter la ville aux favoris de l'utilisateur
    allUserFavorites[currentUser].push(weatherData);
    localStorage.setItem("userFavorites", JSON.stringify(allUserFavorites));
    toast.success(`${weatherData.name} a été ajoutée aux favoris !`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
  };

  if (!weatherData.name) {
    return <div className="title-main-card">Cherchez une ville !</div>;
  }

  return (
    <section className="main-card-section">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
      <div className="city-date-main-card">
        <p className="name-main-card">{name ? `Bienvenue ${name} !` : null}</p>
        <h1 className="title-main-card">
          {cityData.length ? cityData[0].name : weatherData.name}
        </h1>
        <CurrentDate />
      </div>
      <div className="main-card-container">
        <div className="left-card">
          <div className="ressenti">
            <SvgIcons
              path={icons[0].ressenti.path}
              height={icons[0].ressenti.height}
              width={icons[0].ressenti.width}
            />

            <p className="text-data-main-card">
              Ressenti : {Math.round(weatherData.main.feels_like)} °
            </p>
          </div>
          <div className="vent">
            <SvgIcons
              path={icons[0].vent.path}
              height={icons[0].vent.height}
              width={icons[0].vent.width}
            />
            <p className="text-data-main-card">
              Vent : {Math.round(weatherData.wind.speed)} km/h
            </p>
          </div>
          <div className="humidite">
            <SvgIcons
              path={icons[0].humidite.path}
              height={icons[0].humidite.height}
              width={icons[0].humidite.width}
            />

            <p className="text-data-main-card">
              Humidité : {Math.round(weatherData.main.humidity)}%
            </p>
          </div>
          <div className="conditions">
            <SvgIcons
              path={icons[0].conditions.path}
              height={icons[0].conditions.height}
              width={icons[0].conditions.width}
            />

            <p className="text-data-main-card">
              Conditions : {weatherData.weather[0].description}
            </p>
          </div>
        </div>
        <div className="right-card">
          <p className="temperature-main-card">
            {Math.round(weatherData.main.temp)}°
          </p>

          <button
            className="btn-favorites"
            onClick={addToFavorites}
            type="button"
          >
            Ajouter
          </button>
        </div>
      </div>
    </section>
  );
}
