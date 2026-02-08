export const postAService = (serviceCollection) => {
  return async (req, res) => {
    const {
      name,
      category,
      price,
      location,
      image_url,
      pickup_date,
      description,
      email,
    } = req.body;

    // helper to reject empty strings
    function isEmpty(v) {
      return v == null || (typeof v === "string" && v.trim() === "");
    }

    // required field check
    if (
      isEmpty(name) ||
      isEmpty(category) ||
      isEmpty(location) ||
      isEmpty(image_url) ||
      isEmpty(pickup_date) ||
      isEmpty(description) ||
      isEmpty(email)
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // price: allow 0, but still validate
    if (price == null || typeof price !== "number" || isNaN(price)) {
      return res.status(400).json({ error: "Price must be a valid number" });
    }

    // validate + normalize date
    const parsedDate = Number(pickup_date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ error: "Invalid pickup date" });
    }

    // basic URL sanity check (not NSA grade, just not-garbage)
    try {
      new URL(image_url);
    } catch {
      return res.status(400).json({ error: "Invalid image URL" });
    }

    const data = {
      name: name.trim(),
      category: category.trim(),
      price,
      location: location.trim(),
      image_url,
      pickup_date: parsedDate,
      description: description.trim(),
      createdAt: Date.now(),
      email,
    };

    // going for database level shit.
    try {
      const dbRes = await serviceCollection.insertOne(data);

      return res.status(201).json({
        success: true,
        message: "Service created",
        id: dbRes.insertedId,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
  };
};
