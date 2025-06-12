import { MyMCP } from "./mcp";
import { Hono } from "hono"

const app = new Hono()

app.mount('/sse', MyMCP.serveSSE('/sse').fetch, { replaceRequest: false })
app.mount('/mcp', MyMCP.serve('/mcp').fetch, { replaceRequest: false } )
export { MyMCP }
export default app
