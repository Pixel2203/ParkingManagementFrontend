import {NextApiRequest, NextApiResponse} from "next";
import {parkingOverview} from "@/custom_types/types";

export default function (req:NextApiRequest, res:NextApiResponse) {
    res.status(200);
    const response:parkingOverview = {
        parking_lots: [
            {
                name: "Parkplatz 1",
                used: false,
                id: 1
            },
            {
                name: "Parkplatz 2",
                used: true,
                id: 2,
            },
            {
                name: "Parkplatz 3",
                used: false,
                id: 3
            }
        ]
    }
    res.json(response)
}