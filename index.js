import express from 'express'
import { LOADIPHLPAPI } from 'dns'

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => res.send('public/index.html'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
