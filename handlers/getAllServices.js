export const getAllServices = (serviceCollection) => {
  return async (req, res) => {
    try {
      const filter = {};
      if (req.query.category) filter.category = req.query.category;
      if (req.query.location) filter.location = req.query.location;
      if (req.query.email) filter.email = req.query.email;

      const limit = 30;
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const skip = (page - 1) * limit;

      const totalDocs = await serviceCollection.countDocuments(filter);
      const dbRes = await serviceCollection
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
