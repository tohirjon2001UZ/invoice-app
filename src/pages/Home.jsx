import { useEffect, useState } from "react";
import Header from "../components/Header";
import Invoices from "../components/Invoices";
import StatusBadge from "../components/StatusBadge";

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
    const checkedCount = filterElement
      .map((el) => el.checked)
      .filter((el) => el).length;
    const result = filterElement.map((el) => {
      if (el.checked) {
        return checkedCount === 1 ? el.text : `|${el.text}`;
      } else {
        return "";
      }
    });

    setFilter(result)
  }, [JSON.stringify(filterElement)]);

  useEffect(() => {
    setLoading(true);

    fetch("https://json-api.uz/api/project/invoice-app-fn43/invoices")
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
  }, []);
  return (
    <div>
      <Header
        total={invoices.length > 0 ? invoices.length : null}
        filterElement={filterElement}
        setFilterElement={setFilterElement}
      />
      <Invoices invoices={invoices} loading={loading} error={error} />
    </div>
  );
}
