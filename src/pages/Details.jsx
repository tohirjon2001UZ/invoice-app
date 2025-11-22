import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import StatusBadge from "../components/StatusBadge";
import { ArrowLeft, Pen } from "lucide-react";
import EditElementSheet from "../components/EditElementSheet";
import { Skeleton } from "../components/ui/skeleton";

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function setPaid() {
    setLoading(true);
    fetch(`https://json-api.uz/api/project/invoice-app-fn43/invoices/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "paid",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setInvoice(res);
      })
      .catch(() => {
        setError("Xatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function back() {
    navigate(-1);
  }

  useEffect(() => {
    setLoading(true);
    fetch(`https://json-api.uz/api/project/invoice-app-fn43/invoices/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setInvoice(res);
      })
      .catch(() => {
        setError("Xatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-10 container mx-auto">
        <Skeleton className="h-10 w-40 mb-5" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (!invoice) return null;

  return (
    invoice && (
      <div className="py-10">
        <div className="container mx-auto px-10">
          <Button className="mb-5" onClick={back} variant={"secondary"}>
            {" "}
            <ArrowLeft />
            Back{" "}
          </Button>
          <div className="rounded-md shadow px-10 py-3 flex justify-between">
            <span className="inline-flex items-center gap-5">
              Status <StatusBadge status={invoice.status} />
            </span>
            <div className="flex gap-5">
              <EditElementSheet invoice={invoice} setInvoice={setInvoice} />
              <Button variant={"destructive"}>Delete</Button>
              {invoice.status === "pending" && (
                <Button onClick={setPaid} variant={"outline"}>
                  Mark as Paid
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
