import { Split } from "lucide-react";

export function formatDate(date) {
  const year = date.split("-")[0];
  const month = Number(date.split("-")[1]);
  const day = date.split("-")[2];
  console.log(year,month,day);
  

  const months = [
    "",
    "Jan", // January
    "Feb", // February
    "Mar", // March
    "Apr", // April
    "May", // May
    "Jun", // June
    "Jul", // July
    "Aug", // August
    "Sep", // September
    "Oct", // October
    "Nov", // November
    "Dec", // December
  ];

  return `${day} ${months[month]} ${year}`
}
