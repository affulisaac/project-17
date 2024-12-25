export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  const groups = digits.match(/.{1,4}/g) || [];
  return groups.join(" ").substr(0, 19);
}

export function formatExpiryDate(value: string): {
  formattedValue: string;
  month: string;
  year: string;
} {
  const digits = value.replace(/\D/g, "");
  let month = "";
  let year = "";
  let formattedValue = "";

  if (digits.length >= 2) {
    month = digits.substr(0, 2);
    if (parseInt(month) > 12) {
      month = "12";
    }
    formattedValue = month;
    
    if (digits.length > 2) {
      year = digits.substr(2, 2);
      formattedValue += "/" + year;
    }
  } else {
    formattedValue = digits;
  }

  return {
    formattedValue,
    month,
    year,
  };
}