/* eslint-disable no-magic-numbers */
/* No-magic-numbers is disabled to void error with http request status  */
import type { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'
dotenv.config()

export default function handler (_req: NextApiRequest, res: NextApiResponse<TResponse>): void {
  res.status(204).json({ ok: true })
}

interface TResponse {
  ok: boolean
}
