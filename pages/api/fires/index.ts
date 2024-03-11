import { getAllWildfires } from "@/types/util";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    count = "",
    fireCause = "",
    fireStatus = "",
    geographicDescription = "",
  } = req.query as { count: string; fireCause: string; fireStatus: string, geographicDescription: string };
  try {
    const response = await axios.get(
      getAllWildfires(count, fireCause, fireStatus, geographicDescription)
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error });
  }
}