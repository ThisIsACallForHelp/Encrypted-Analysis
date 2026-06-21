import dotenv from 'dotenv'
import app from './src/app.js'

dotenv.config()

const PORT = process.env.PORT || 5000

//error handling
process.on('uncaughtException', (err) => {
    console.error('[FATAL SYSTEM FAULT] Uncaught Exception. Halting instantly.', err)
    process.exit(1)
})

process.on('unhandledRejection', (err) => {
    console.error('[FATAL SYSTEM FAULT] Unhandled Rejection. Shutting down.', err)
    process.exit(1)
})

//listen start
const startServer = async () => 
{
    try 
    {
        //Await DB connection here in the future
        //await db.connect();
        app.listen(PORT, () => 
        {
            console.log(`Vault is on! Listening on port ${PORT}`)
            console.log('[SECURITY] API endpoints primed for strictly validated Postman traffic.')
        })
    } 
    catch (error) 
    {
        console.error('[STARTUP FAILURE] Could not ignite the Vault.', error)
        process.exit(1)
    }
}
startServer()