export const resetDatabase = (serviceCollection, orderCollection) => {
  return async (req, res) => {
    const default_data = req.body;

    if (!Array.isArray(default_data)) {
      return res.status(400).json({ error: "Invalid Data" });
    }

    try {
      await serviceCollection.deleteMany({});
      await serviceCollection.insertMany(default_data);

      await orderCollection.deleteMany({});

      res.status(200).json({ success: true, message: "Reset Done" });
    } catch (err) {
      res.status(500).json({ error: "Database Error" });
    }
  };
};
