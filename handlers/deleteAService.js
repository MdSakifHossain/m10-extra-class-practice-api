import { ObjectId } from "mongodb";

export const deleteAService = (serviceCollection) => {
  return async (req, res) => {
    try {
      const filter = { _id: new ObjectId(req.params.id) };
      const doc = await serviceCollection.deleteOne(filter);
      res.status(200).json(doc);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
