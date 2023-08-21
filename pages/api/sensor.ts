import {NextApiRequest, NextApiResponse} from "next";

export default function (req: NextApiRequest, res:NextApiResponse){
    res.status(200);
    res.json({
        parking_lots: [
            {
                name: "Parkplatz 1",
                sensors: {

                }
            }
        ]
    })
}