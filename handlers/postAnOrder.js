import { validate } from "../lib/validate/index.js";

export const postAnOrder = (orderCollection) => {
  return async (req, res) => {
    const errors = validate.orders.post(req.body);

    let error_message = "";
    errors.map((error) => (error_message += `- ${error}\n`));

    if (errors.length > 0) {
      const error_object = {
        count: errors.length,
        error: errors,
        error_message,
      };

      res.status(400).json(error_object);
      return;
    }

    const {
      productName,
      buyerName,
      price,
      quantity,
      address,
      phoneNumber,
      email,
      additionalNote,
      productID,
      date,
    } = req.body;

    // validation done

    // prepare the data
    const data = {
      productName,
      buyerName,
      price,
      quantity,
      address,
      phoneNumber,
      email,
      additionalNote,
      productID,
      date,
    };

    // going for database level shit.
    try {
      const dbRes = await orderCollection.insertOne(data);

      return res.status(201).json({
        success: true,
        message: "Order Placed",
        id: dbRes.insertedId,
      });
    } catch (err) {
      return res.status(500).json({ error: "Database error" });
    }
  };
};
