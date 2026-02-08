export const getAllOrders = (orderCollection) => {
  return async (req, res) => {
    const filter = {};
    if (req.query.email) filter.email = req.query.email;

    if (!req.query.email)
      return res.status(400).json({ error: "Email query is Required" });

    const limit = 30;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const skip = (page - 1) * limit;

    try {
      const totalDocs = await orderCollection.countDocuments(filter);
      const dbRes = await orderCollection
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();

      res.status(200).json({
        pagination: {
          page,
          limit,
          total: totalDocs,
          pages: Math.ceil(totalDocs / limit),
        },
        data: dbRes,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
