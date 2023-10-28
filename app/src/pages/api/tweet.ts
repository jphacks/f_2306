import mysql_connection from "@/application/lib/db/connect_db";
import type { NextApiRequest, NextApiResponse } from "next";

type Tweet = {
  userId: string;
  content: string;
  type: "tweet" | "model" | "camera";
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // mysqlと接続
  const connection = await mysql_connection();

  if (req.method === "POST") {
    const { userId, content, type }: Tweet = req.body;

    if (!userId || !content || !type) {
      return res.status(400).json({
        success: false,
        message: "Required parameters are missing",
      });
    }

    if (!["tweet", "model", "camera"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type parameter",
      });
    }

    try {
      const result = await connection.query(
        "INSERT INTO tweet (user_id, content, type) VALUES (?, ?, ?)",
        [userId, content, type]
      );

      res
        .status(200)
        .json({ message: "データが正常に格納されました。", result });
    } catch (error) {
      res.status(500).json({
        message: "データの追加に失敗しました。",
        error: error,
      });
    }
  } else if (req.method === "GET") {
    try {
      const result = await connection.query("SELECT * FROM tweet");

      res
        .status(200)
        .json({ message: "データの取得に成功しました。", tweets: result[0] });
    } catch (error) {
      res.status(500).json({
        massage: "データの取得に失敗しました。",
        error: error,
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
}
