export const postOrder = (data) => {
  const errors = [];

  if (!data.productName || typeof data.productName !== "string") {
    errors.push("Product name is required and must be a string.");
  }

  if (typeof data.price !== "number" || data.price < 0) {
    errors.push("Price must be a positive number.");
  }

  if (typeof data.quantity !== "number" || data.quantity <= 0) {
    errors.push("Quantity must be a positive number.");
  }

  if (!data.buyerName || typeof data.buyerName !== "string") {
    errors.push("Buyer name is required and must be a string.");
  }

  if (!data.address || typeof data.address !== "string") {
    errors.push("Address is required and must be a string.");
  }

  if (!data.phoneNumber || !/^\d{10,15}$/.test(data.phoneNumber)) {
    errors.push("Phone number must be a valid format.");
  }

  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push("Email must be valid.");
  }

  // Optional field: only validate if provided
  if (
    data.additionalNote !== undefined &&
    typeof data.additionalNote !== "string"
  ) {
    errors.push("Additional note must be a string.");
  }

  if (!data.productID || typeof data.productID !== "string") {
    errors.push("Product ID is required and must be a string.");
  }

  // Date is in milliseconds (number format)
  if (typeof data.date !== "number" || isNaN(data.date)) {
    errors.push("Date must be a valid number (milliseconds).");
  }

  return errors;
};
