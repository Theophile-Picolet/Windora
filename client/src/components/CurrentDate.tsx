export default function CurrentDate() {
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(today);
  return <h2 className="date-main-card">{formattedDate}</h2>;
}
