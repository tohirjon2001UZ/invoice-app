import InvoiceCard from "./InvoiceCard";
import SkeletonLoading from "./SkeletonLoading";

export default function Invoices({ invoices, loading, error }) {
  if (loading) {
    return <SkeletonLoading count={7} />;
  }

  if (error) {
    return (
      <h1 className="text-center text-4xl py-20 font-bold opacity-70">
        Xatolik yuz berdi
      </h1>
    );
  }

  return (
    <div className="flex flex-col gap-4 container mx-auto px-10">
      {invoices.map((inv) => {
        return (
          <InvoiceCard
            clientName={inv.clientName}
            paymentDue={inv.paymentDue}
            id={inv.id}
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