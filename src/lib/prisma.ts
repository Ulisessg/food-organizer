// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { PrismaClient } from '@prisma/client'

/*
 * PrismaClient is attached to the `global` object in development to prevent
 * exhausting your database connection limit.
 *
 * Learn more:
 * https://pris.ly/d/help/next-js-best-practices
 */

// eslint-disable-next-line init-declarations
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // eslint-disable-next-line no-eq-null
  if (global.prisma == null) {
    global.prisma = new PrismaClient()
  }
  // eslint-disable-next-line prefer-destructuring
  prisma = global.prisma
}
export default prisma
