import type { NextApiResponse, NextApiRequest } from "next";
import dotenv from "dotenv";
dotenv.config();

function handler(req: NextApiRequest, res: NextApiResponse<TResponse>) {
  res.status(200).json({ ok: true });
}

export default handler;

type TResponse = {
  ok: boolean;
};
