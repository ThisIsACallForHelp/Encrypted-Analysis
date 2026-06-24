import dotenv from 'dotenv'
import app from './src/app.js'

dotenv.config()

const PORT = process.env.PORT || 5000

//error handling
process.on('uncaughtException', (err) => {
    console.error('uncaught exception ', err)
    process.exit(1)
})

process.on('unhandledRejection', (err) => {
    console.error('unhandled rejection', err)
    process.exit(1)
})

const startServer = async () => 
{
    try 
    {
        app.listen(PORT, () => 
        {
            console.log(`server on port -> ${PORT}`)
        })
    } 
    catch (error) 
    {
        console.error('couldnt start the server -> ', error)
        process.exit(1)
    }
}
startServer()