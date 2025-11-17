import { Split } from "lucide-react";

export function formatDate(date) {
  const year = date.split("-")[0];
  const month = Number(date.split("-")[1]);
  const day = date.split("-")[2];

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

  return `${day} ${months[month]} ${year}`;
}


export function objFormatter(obj) {
  const result = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (key.includes(".")) {
        const piece = key.split(".");
        const objValue = {
          [piece[1]]: value,
        };

        return [piece[0], objValue];
      } else {
        return [key, value];
      }
    })
  );

  console.log(result);
}
