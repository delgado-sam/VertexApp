import { eventHandler } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'

export default eventHandler(async (event) => {
  try {
    const filePath = path.join(process.cwd(), 'server/clients.json')
    const data = await fs.readFile(filePath, 'utf-8')
    event.node.res.statusCode = 200
    event.node.res.setHeader('Content-Type', 'application/json')
    return JSON.parse(data)
  } catch (error) {
    event.node.res.statusCode = 500
    event.node.res.setHeader('Content-Type', 'application/json')
    return { error: 'Internal Server Error' }
  }
})
