import { useEffect, useState } from "react";
import InvoiceCard from "./InvoiceCard";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

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

  if (loading) {
  }
  if (error) {
  }
  return (
    <div className="flex flex-col gap-4 ">
      {invoices.map((inv) => {
        return (
          <InvoiceCard
            clientName={inv.clientName}
            paymentDue={inv.paymentDue}
            elId={inv.elId}
            status={inv.status}
            total={inv.total}
            key={inv.id}
          />
        );
      })}
    </div>
  );
}
