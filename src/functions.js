export function formatDate(date) {
  const year = date?.split("-")[0];
  const month = Number(date?.split("-")[1]);
  const day = date?.split("-")[2];

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
  const clientAddress = {};
  const senderAddress = {};
  const result = {};

  for (const key in obj) {
    if (key.includes(".")) {
      const checkKey = key.split(".");
      if (checkKey[0] === "clientAddress") {
        clientAddress[checkKey[1]] = obj[key];
      } else if (checkKey[0] === "senderAddress") {
        senderAddress[checkKey[1]] = obj[key];
      }
    } else {
      result[key] = obj[key];
    }
  }

  result.clientAddress = clientAddress;
  result.senderAddress = senderAddress;

  return result;
}

export function formValidation(obj) {
  if (obj["senderAddress.street"] === "") {
    return {
      target: "senderAddress.street",
      message: "Jo'natuvchi manzilini kiritmadingiz!",
    };
  } else if (obj["senderAddress.city"] === "") {
    return {
      target: "senderAddress.city",
      message: "Jo'natuvchi shahrini kiritmadingiz!",
    };
  } else if (obj["senderAddress.postCode"] === "") {
    return {
      target: "senderAddress.postCode",
      message: "Jo'natuvchi pochta manzilini kiritmadingiz!",
    };
  } else if (obj["senderAddress.country"] === "") {
    return {
      target: "senderAddress.country",
      message: "Jo'natuvchi mamlakatini kiritmadingiz!",
    };
  } else if (obj["clientName"] === "") {
    return {
      target: "clientName",
      message: "Buyurtmachi ismini kiritmadingiz!",
    };
  } else if (obj["clientEmail"] === "") {
    return {
      target: "clientEmail",
      message: "Buyurtmachi email manzilini kiritmadingiz!",
    };
  } else if (obj["clientAddress.street"] === "") {
    return {
      target: "clientAddress.street",
      message: "Buyurtmachi manzilini kiritmadingiz!",
    };
  } else if (obj["clientAddress.city"] === "") {
    return {
      target: "clientAddress.city",
      message: "Buyurtmachi shahrini kiritmadingiz!",
    };
  } else if (obj["clientAddress.postCode"] === "") {
    return {
      target: "clientAddress.postCode",
      message: "Buyurtmachi pochta manzilini kiritmadingiz!",
    };
  } else if (obj["clientAddress.country"] === "") {
    return {
      target: "clientAddress.country",
      message: "Buyurtmachi mamlakatini kiritmadingiz!",
    };
  } else if (!obj["paymentDue"]) {
    return {
      target: "paymentDue",
      message: "To'lov sanasini belgilamadingiz!",
    };
  } else if (!obj["paymentTerms"]) {
    return {
      target: "paymentTerms",
      message: "To'lov mudatini belgilamadingiz!",
    };
  } else if (obj["description"] === "") {
    return {
      target: "description",
      message: "To'lov uchun izoh yozmadingiz!",
    };
  } else if (obj.items.length === 0) {
    return {
      target: null,
      message: "Qanday mahsulotlar olganingizni belgilang!",
    };
  } else {
    return false;
  }
}
