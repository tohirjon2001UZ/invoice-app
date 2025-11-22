import { useEffect, useState } from "react";
import Header from "../components/Header";
import Invoices from "../components/Invoices";

export default function Home() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [filterElement, setFilterElement] = useState([
    {
      checked: false,
      text: "draft",
    },
    {
      checked: false,
      text: "pending",
    },
    {
      checked: false,
      text: "paid",
    },
  ]);

  useEffect(() => {
    const result = filterElement
      .map((el) => {
        if (el.checked) {
          return `|${el.text}`;
        } else {
          return "";
        }
      })
      .join("")
      .slice(1);

    setFilter(result);
  }, [JSON.stringify(filterElement)]);

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://json-api.uz/api/project/invoice-app-fn43/invoices${
        filter !== "" ? `?status=${filter}` : filter
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        setInvoices(res.data);
      })
      .catch(() => {
        setError("Something went wrong :(");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  
  return (
    <div>
      <Header
        total={invoices.length > 0 ? invoices.length : null}
        filterElement={filterElement}
        setFilterElement={setFilterElement}
        setInvoices={setInvoices}
      />
      <Invoices invoices={invoices} loading={loading} error={error} />
    </div>
  );
}
