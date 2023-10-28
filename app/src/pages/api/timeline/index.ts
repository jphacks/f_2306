import mysql_connection from "@/application/lib/db/connect_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const connection = await mysql_connection();

        const result = await connection.query('SELECT * FROM tweet where is_delete = 0');
  
        res
          .status(200)
          .json({
            message: 'Data acquisition was successful.',
            tweets: result[0],
          });
      } catch (error) {
        res.status(500).json({
          massage: 'Failed to retrieve data.',
          error: error,
        });
      }
}