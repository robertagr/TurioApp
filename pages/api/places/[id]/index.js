import dbConnect from "../../../../db/connect";
import Location from "../../../../db/models/Location";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }
  if (request.method === "GET") {
    const location = await Location.findById(id);
    response.status(200).json(location);
    if (!location) {
      return response.status(404).json({ status: "Not found" });
    }
  } else if (request.method === "PATCH") {
    const updateLocation = request.body;
    await Location.findByIdAndUpdate(id, updateLocation);
    if (updateLocation) {
      return response.status(200).json({ status: `Location ${id} updated!` });
    }
  } else if (request.method === "DELETE") {
    await Location.findByIdAndDelete(id);
    return response.status(200).json({ status: `Location ${id} deleted!` });
  }
}
