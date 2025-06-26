import "../styles/Cardhours.css";

export default function Cardhours({ day }: DayTypes) {
  const dateString = day.dt_txt;
  const time = dateString.split(" ")[1].substring(0, 5);
  return (
    <>
      <div className="card-hour">
        <p>{Math.round(day.main.temp)}°</p>
        <img
          src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
          alt={`${day.weather[0].icon}`}
        />
        <p>{time}</p>
      </div>
    </>
  );
}
