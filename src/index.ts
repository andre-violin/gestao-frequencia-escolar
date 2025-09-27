import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'

class App {
  public express: Application
  private port: number

  constructor() {
    this.express = express()
    this.port = 5500
    this.initializeMiddlewares()
    this.initializeRoutes()
  }

  private initializeMiddlewares(): void {
    // Middlewares de segurança
    this.express.use(helmet())
    this.express.use(cors())

    // Parser JSONO
    this.express.use(express.json())
  }

  private initializeRoutes(): void {
    // Health check
    this.express.get('/health', (req, res) => {
      res.json({ status: 'OK', timestamp: new Date().toISOString() })
    })
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`)
    })
  }
}

// Instância do servidor
const app = new App()
app.listen()
