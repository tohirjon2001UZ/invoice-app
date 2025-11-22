import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/button";
import { Pen, PlusCircleIcon, Trash } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";

("use client");
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formValidation, objFormatter } from "../functions";
import { toast } from "sonner";

export default function EditElementSheet({invoice, setInvoice}) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(invoice.items);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date(invoice.paymentDue));

  function sendData(data) {
    setLoading(true);
    fetch(`https://json-api.uz/api/project/invoice-app-fn43/invoices/${invoice.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setInvoice(res)
        toast.success("Ma'lumot muvaffaqiyatli yangilandi");
      })
      .catch(() => {
        toast.error("Backendga ma'lumot jo'natishda xatolik yuz berdi");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleItems(id, key, value) {
    const updatedElement = items.find((el) => el.id === id);
    const result = items.map((el) => {
      if (el.id === id) {
        updatedElement[key] = value;
        updatedElement.total = updatedElement.quantity * updatedElement.price;
        return updatedElement;
      } else {
        return el;
      }
    });

    setItems(result);
  }

  function deleteItems(id) {
    const result = items.filter((el) => el.id !== id);
    setItems(result);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const result = {};

    const formData = new FormData(evt.target);
    formData.forEach((value, key) => {
      result[key] = value;
    });
    result.items = items;
    result.paymentDue = date;
    result.total = items.reduce((acc, el) => {
      return (acc += el.total);
    }, 0);

    const check = formValidation(result);

    if (check) {
      const { target, message } = check;
      evt.target[target]?.focus();
      toast.error(message);
    } else {
      const readyData = objFormatter(result);
      sendData(readyData);
    }
  }

  return (
    <Sheet>
      <SheetTrigger
        className={`${buttonVariants({ variant: "secondary" })} rounded-md!`}
      >
        <Pen/> Edit
      </SheetTrigger>
      <SheetContent className="h-[85vh]" side="bottom">
        <SheetHeader>
          <SheetTitle>Edit {invoice.elId}</SheetTitle>
          <SheetDescription>Edit element</SheetDescription>
        </SheetHeader>

        <div className="pt-10 pb-24 px-5 h-full overflow-y-scroll">
          <form onSubmit={handleSubmit}>
            <fieldset className="mb-10">
              <legend className="font-bold text-[#7C5DFA] mb-5">
                Bill Form
              </legend>
              <div className="grid w-full  items-center gap-3 mb-5">
                <Label htmlFor="senderAddress.street">Street Address</Label>
                <Input
                  type="text"
                  defaultValue={invoice.senderAddress.street}
                  id="senderAddress.street"
                  name="senderAddress.street"
                />
              </div>
              <div className="flex gap-6">
                <div className="grid w-full  items-center gap-3">
                  <Label htmlFor="senderAddress.city">City</Label>
                  <Input
                    type="text"
                    defaultValue={invoice.senderAddress.city}
                    id="senderAddress.city"
                    name="senderAddress.city"
                  />
                </div>
                <div className="grid w-full  items-center gap-3">
                  <Label htmlFor="senderAddress.postCode">Post Code</Label>
                  <Input
                    type="text"
                    defaultValue={invoice.senderAddress.postCode}
                    id="senderAddress.postCode"
                    name="senderAddress.postCode"
                  />
                </div>
                <div className="grid w-full  items-center gap-3">
                  <Label htmlFor="senderAddress.country">Country</Label>
                  <Input
                    type="text"
                    defaultValue={invoice.senderAddress.country}
                    id="senderAddress.country"
                    name="senderAddress.country"
                  />
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-bold text-[#7C5DFA] mb-5">Bill To</legend>
              <div className="grid w-full  items-center gap-3 mb-5">
                <Label htmlFor="clientName">Client's Name</Label>
                <Input type="text" id="clientName" defaultValue={invoice.clientName} name="clientName" />
              </div>
              <div className="grid w-full  items-center gap-3 mb-5">
                <Label htmlFor="clientEmail">Client's Email</Label>
                <Input
                  type="email"
                  defaultValue={invoice.clientEmail}
                  id="clientEmail"
                  name="clientEmail"
                  placeholder="e.g. email@example.com"
                />
              </div>
              <div className="grid w-full  items-center gap-3 mb-5">
                <Label htmlFor="clientAddress.street">Street Address</Label>
                <Input
                  type="text"
                  defaultValue={invoice.clientAddress.street}
                  id="clientAddress.street"
                  name="clientAddress.street"
                />
              </div>
              <div className="flex gap-6">
                <div className="grid w-full  items-center gap-3 mb-5">
                  <Label htmlFor="clientAddress.city">City</Label>
                  <Input
                    type="text"
                    defaultValue={invoice.clientAddress.city}
                    id="clientAddress.city"
                    name="clientAddress.city"
                  />
                </div>
                <div className="grid w-full  items-center gap-3">
                  <Label htmlFor="clientAddress.postCode">Post Code</Label>
                  <Input
                    type="text"
                    defaultValue={invoice.clientAddress.postCode}
                    id="clientAddress.postCode"
                    name="clientAddress.postCode"
                  />
                </div>
                <div className="grid w-full  items-center gap-3">
                  <Label htmlFor="clientAddress.country">Country</Label>
                  <Input
                    type="text"
                    defaultValue={invoice.clientAddress.country}
                    id="clientAddress.country"
                    name="clientAddress.country"
                  />
                </div>
              </div>

              {/* Calendar */}
              <div className="flex gap-5">
                {/* Date */}
                <div className="flex flex-col gap-3">
                  <Label htmlFor="date" className="px-1">
                    Invoice Date
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-96 justify-between font-normal"
                      >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDate(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Select */}
                <div className="grid w-full  items-center gap-3 mb-5">
                  <Label htmlFor="paymentTerms">Country</Label>
                  <Select id="paymentTerms" name="paymentTerms" defaultValue={invoice.paymentTerms.toString()}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Terms</SelectLabel>
                        <SelectItem value="1">Net 1 Day</SelectItem>
                        <SelectItem value="7">Net 7 Days</SelectItem>
                        <SelectItem value="14">Net 14 Days</SelectItem>
                        <SelectItem value="30">Net 30 Days</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid w-full  items-center gap-3 mb-5">
                <Label htmlFor="description">Project Description</Label>
                <Input type="text" id="description" name="description" defaultValue={invoice.description}/>
              </div>
            </fieldset>

            {/* Buttons */}
            <div className="absolute bottom-0 p-3 bg-white border w-full flex justify-between">
              <SheetClose
                className={buttonVariants({ variant: "outline" })}
                type="reset"
              >
                Discard
              </SheetClose>
              <div className="flex gap-5 mr-10">
                <Button disabled={loading} type="submit">
                  Save
                </Button>
              </div>
            </div>
          </form>

          {/* Items */}
          <div className="flex flex-col gap-3 mb-3">
            {items.length > 0 &&
              items.map((el) => {
                return (
                  <div className="flex items-center gap-5">
                    <Input
                      type="text"
                      value={el.name}
                      name="name"
                      onChange={(evt) => {
                        handleItems(el.id, "name", evt.target.value);
                      }}
                    />
                    <Input
                      type="number"
                      value={el.quantity}
                      name="quantity"
                      onChange={(evt) => {
                        handleItems(el.id, "quantity", evt.target.value);
                      }}
                    />
                    <Input
                      type="number"
                      value={el.price}
                      name="price"
                      onChange={(evt) => {
                        handleItems(el.id, "price", evt.target.value);
                      }}
                    />
                    <span>{el.total}</span>
                    <Button
                      onClick={() => {
                        deleteItems(el.id);
                      }}
                      variant="destructive"
                    >
                      <Trash />
                    </Button>
                  </div>
                );
              })}

            <Button
              className="w-full p-6 rounded-full"
              variant="outline"
              type="button"
              onClick={() => {
                setItems([
                  ...items,
                  {
                    name: "",
                    quantity: 0,
                    price: 0,
                    total: 0,
                    id: window.crypto.randomUUID(),
                  },
                ]);
              }}
            >
              + Add New Item
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}