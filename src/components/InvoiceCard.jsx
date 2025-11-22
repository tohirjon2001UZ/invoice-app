import { ArrowRight } from "lucide-react";
import { formatDate } from "../functions";
import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";

export default function InvoiceCard({
  id,
  paymentDue,
  clientName,
  total,
  status,
}) {
  const navigate = useNavigate();
  function handleClick(id) {
    navigate(`/${id}`);
  }
  return (
    <div
      onClick={() => handleClick(id)}
      className="py-4 px-8 rounded-xl shadow-md flex justify-between border-transparent cursor-pointer border-2 hover:border-blue-500 group"
    >
      <span className="font-bold text-[12px]">
        <span className="text-[#7E88C3]">#</span>
        {id}
      </span>
      <time className="text-[#7E88C3]" dateTime={paymentDue}>
        {paymentDue ? `${formatDate(paymentDue)}` : "---"}
      </time>
      <h3 className="text-[#858BB2]">{clientName ? clientName : "---"}</h3>
      <span className="text-[16px] font-bold">{total}</span>
      <div className="flex items-center gap-5">
        <StatusBadge status={status} />
        <ArrowRight className="opacity-0 group-hover:opacity-100 transition" />
      </div>
    </div>
  );
}
