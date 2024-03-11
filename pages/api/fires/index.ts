import { getAllWildfiresURL } from "@/types/util";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { json2csv } from "json-2-csv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  switch (method) {
    case "GET":
      const {
        count = "",
        fireCause = "",
        fireStatus = "",
        geographicDescription = "",
      } = req.query as {
        count: string;
        fireCause: string;
        fireStatus: string;
        geographicDescription: string;
      };
      try {
        const response = await axios.get(
          getAllWildfiresURL(
            count,
            fireCause,
            fireStatus,
            geographicDescription
          )
        );
        return res.status(200).json(response.data);
      } catch (error) {
        return res.status(500).json({ error });
      }
    case "POST":
      const data = req.body.data;
      try {
        const csv = await json2csv(data);
        return res.status(200).json({ document: csv });
      } catch (error) {
        return res.status(500).json({ error });
      }

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
};