const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express ()
const port = 3001
let db

app.use(express.json())
app.use(cors())

mongoose
.connect(
    "mongodb+srv://fmcabalm:DqtkWYGtWMV8SB7e@cluster0.r7uuvfj.mongodb.net/sample_mflix?retryWrites=true&w=majority"
)
.then(() => {
    console.log('connect to Mongo Atlas')
    db = mongoose.connection.db
}
)

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)     
})

app.get('/API1', async (req, res) => {
    try{
       console.log("Esta dentro");
         const result = await db
        .collection ("movies")
         .find()
           .limit(0)
          .toArray()
          return res.status(200).json({
               ok: true,
               data:result,
          })
       }   catch(error){
           console.log(error)
           res.status(400).json({
              ok: false,
               message: error.message,
           })    
    }  
   })

   app.post('/API2', async (req, res) => {
    try{
       console.log("Esta desde el click");
         const result = await db
        .collection ("movies")
         .find({$and:[{ poster: { $exists: true } }, { genres: { $in: [req.body.categoria] } }]}
            
         )
           .limit(req.body.peticion)
          .toArray()
          return res.status(200).json({
               ok: true,
               data:result,
          })
       }   catch(error){
           console.log(error)
           res.status(400).json({
              ok: false,
               message: error.message,
           })    
    }  
   })