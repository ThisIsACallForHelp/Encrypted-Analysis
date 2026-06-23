import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routeUrls from "./routes/master.router.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000


app.use(express.json({ limit: '10kb' }))


app.use((err, req, res, next) =>
{
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err)
    {
        console.error('invalid json')
        return res.status(400).json({error: 'invalid json'})
    }
    next()
});
app.use('/api', routeUrls)
app.use('*', (req, res) =>
{
    res.status(404).json({ error: 'invalid endpoint'})
});

app.use((err, req, res, next) =>
{
    console.error(`${err.message}`)    
    const statusCode = err.status || 500
    const sanitizedMessage = statusCode === 500 
        ?'server error' 
        :err.message

    res.status(statusCode).json({
        error:
        {
            status: statusCode,
            message: sanitizedMessage
        }
    })
})

export default app;