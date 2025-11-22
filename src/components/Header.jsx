import { ArrowDown, ArrowUp } from "lucide-react";
import { useRef, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import AddElementSheet from "./AddElementSheet";

export default function Header({
  total,
  filterElement,
  setFilterElement,
  setInvoices,
}) {
  const [open, setOpen] = useState(false);
  const list = useRef();
  const button = useRef();

  function handleClick() {
    setOpen(!open);
  }

  function handleChecker(element) {
    const result = filterElement.map((el) => {
      if (el.text === element) {
        return { ...el, checked: !el.checked };
      } else {
        return el;
      }
    });

    setFilterElement(result);
  }
  return (
    <header className="pt-[72px] pb-[65px] ">
      <div className="mx-auto container px-10 flex justify-between  ">
        <div>
          <h1 className="font-bold text-4xl mb-3">Invoices</h1>
          {total && (
            <p className="text-slate-500">There are {total} total invoices</p>
          )}
        </div>
        <div className="relative">
          <button
            ref={button}
            className="inline-flex items-center gap-1 hover:bg-muted py-2 px-4 rounded-md mr-3"
            onClick={handleClick}
          >
            Filter by status {open ? <ArrowUp /> : <ArrowDown />}
          </button>
          {open && (
            <div
              ref={list}
              className="flex flex-col gap-1 absolute p-2 rounded-md shadow min-w-[180px] bg-white top-12"
            >
              {filterElement.map((el) => {
                return (
                  <span
                    key={el.text}
                    className="inline-flex gap-2 items-center w-full hover:bg-muted rounded-md p-1 select-none"
                    onClick={() => {
                      handleChecker(el.text);
                    }}
                  >
                    <Checkbox checked={el.check} />
                    <span className="capitalize">{el.text}</span>
                  </span>
                );
              })}
            </div>
          )}
          <AddElementSheet setInvoices={setInvoices} />
        </div>
      </div>
    </header>
  );
}
