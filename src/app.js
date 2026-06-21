//imports and configs + error handling in request
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routeUrls from "../routes/master.router.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000

//limiting size to prevent memory exhustion
app.use(express.json({ limit: '10kb' }))

//handling bad json
app.use((err, req, res, next) =>
{
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err)
    {
        console.error('[SECURITY ALARM] Malformed JSON')
        return res.status(400).json({error: 'Bad Request: Invalid JSON syntax'})
    }
    next()
});
app.use('/api', routeUrls)
//too general/wrong request handling
app.use('*', (req, res) =>
{
    res.status(404).json({ error: 'Endpoint not found in Zero-Trust environment'})
});

app.use((err, req, res, next) =>
{
    console.error(`[SYSTEM ERROR]: ${err.message}`)    
    const statusCode = err.status || 500
    const sanitizedMessage = statusCode === 500 
        ?'Internal Server Error: Execution halted for security' 
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