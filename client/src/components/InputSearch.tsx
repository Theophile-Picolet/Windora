import { useNavigate } from "react-router-dom";
import "../styles/InputSearch.css";
import SvgIcons from "./SvgIcons";
import { useWeather } from "./WeatherContext";

const icons = [
  {
    search: {
      width: "32px",
      height: "32px",
      path: "M792-120.67 532.67-380q-30 25.33-69.64 39.67Q423.39-326 378.67-326q-108.44 0-183.56-75.17Q120-476.33 120-583.33t75.17-182.17q75.16-75.17 182.5-75.17 107.33 0 182.16 75.17 74.84 75.17 74.84 182.27 0 43.23-14 82.9-14 39.66-40.67 73l260 258.66-48 48Zm-414-272q79.17 0 134.58-55.83Q568-504.33 568-583.33q0-79-55.42-134.84Q457.17-774 378-774q-79.72 0-135.53 55.83-55.8 55.84-55.8 134.84t55.8 134.83q55.81 55.83 135.53 55.83Z",
    },
    user: {
      width: "32px",
      height: "32px",
      path: "M226-262q59-42.33 121.33-65.5 62.34-23.17 132.67-23.17 70.33 0 133 23.17T734.67-262q41-49.67 59.83-103.67T813.33-480q0-141-96.16-237.17Q621-813.33 480-813.33t-237.17 96.16Q146.67-621 146.67-480q0 60.33 19.16 114.33Q185-311.67 226-262Zm253.88-184.67q-58.21 0-98.05-39.95Q342-526.58 342-584.79t39.96-98.04q39.95-39.84 98.16-39.84 58.21 0 98.05 39.96Q618-642.75 618-584.54t-39.96 98.04q-39.95 39.83-98.16 39.83ZM480.31-80q-82.64 0-155.64-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.51T80-480.18q0-82.82 31.5-155.49 31.5-72.66 85.83-127Q251.67-817 324.51-848.5T480.18-880q82.82 0 155.49 31.5 72.66 31.5 127 85.83Q817-708.33 848.5-635.65 880-562.96 880-480.31q0 82.64-31.5 155.64-31.5 73-85.83 127.34Q708.33-143 635.65-111.5 562.96-80 480.31-80Zm-.31-66.67q54.33 0 105-15.83t97.67-52.17q-47-33.66-98-51.5Q533.67-284 480-284t-104.67 17.83q-51 17.84-98 51.5 47 36.34 97.67 52.17 50.67 15.83 105 15.83Zm0-366.66q31.33 0 51.33-20t20-51.34q0-31.33-20-51.33T480-656q-31.33 0-51.33 20t-20 51.33q0 31.34 20 51.34 20 20 51.33 20Zm0-71.34Zm0 369.34Z",
    },
  },
];

export default function InputSearch() {
  const { city, setCity, handleFetchData } = useWeather();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.currentTarget.value);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="container-input">
        <button
          type="button"
          className="btn-user"
          onClick={() => navigate("/")}
        >
          <SvgIcons
            path={icons[0].user.path}
            height={icons[0].user.height}
            width={icons[0].user.width}
          />
        </button>
        <input
          value={city}
          type="text"
          placeholder="Chercher une ville..."
          className="input-text"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFetchData();
            }
          }}
        />
        <button type="button" className="btn-search" onClick={handleFetchData}>
          <SvgIcons
            path={icons[0].search.path}
            height={icons[0].search.height}
            width={icons[0].search.width}
          />
        </button>
      </div>
    </>
  );
}
