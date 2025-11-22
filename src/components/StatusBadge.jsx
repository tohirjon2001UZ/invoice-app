export default function StatusBadge({ status = "draft" }) {
  const styles = {
    draft: {
      bg: "bg-[rgba(55,59,83,5%)]",
      text: "text-[#373B53]",
      dot: "bg-[#373B53]",
    },
    pending: {
      bg: "bg-[rgba(255,143,0,5%)]",
      text: "text-[#FF8F00]",
      dot: "bg-[#FF8F00]",
    },
    paid: {
      bg: "bg-[rgba(51,214,159,5%)]",
      text: "text-[#33D69F]",
      dot: "bg-[#33D69F]",
    },
  };
  return (
    <span
      className={`inline-flex items-center justify-center gap-2 py-3 px-[18px] rounded-md min-w-[104px] ${styles[status].bg}`}
    >
      <span
        className={`w-2 h-2 inline-block rounded-full ${styles[status].dot}`}
      ></span>
      <span
        className={`capitalize font-medium text-[12px] ${styles[status].text}`}
      >
        {status}
      </span>
    </span>
  );
}
