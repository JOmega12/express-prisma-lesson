import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();

app.use(express.json());


const prisma = new PrismaClient();

// http://localhost:3000
// app.get('/', (req, res) => {
//    res.send(`<h1>Cool </h1>`);
// });

//INDEX Endpoint
app.get('/characters', async(req, res) => {
   // res.send(characters)
   const characters = await prisma.character.findMany();
   res.send(characters)
})

//Show Endpoint
app.get("/characters/:id", async(req, res) => {
   // res.send(characters.find(char => char.id === +req.params.id))

   const id = +req.params.id
   const character  = await prisma.character.findUnique({
      where: {
         id: id,
      }
   })

   if(!character) {
      return res.status(404).send("No Content")
   }
   res.send(character)

})

// DELETE ENDPOINT
app.delete("/characters/:id", async(req, res) => {
   const id = +req.params.id;

   const deleted = await Promise.resolve()
   .then(() => prisma.character.delete({
      where: {
         id,
      }
   }))
   .catch(() => null);
   if(deleted === null){
      res.status(404).send({error: "Character Not Found"})
   }
   
   return res.status(200).send("Great Success")
})

// // CREATE ENDPOINT / POST ENDPOINT
// app.post("/characters", (req, res) => {
//    // console.log('posting character');
//    // console.log({
//    //    body: req.body,
//    // });
//    characters.push(req.body);
//    res.status(201).send(req.body);
//    // res.send('yay!')

// })


// app.patch("/characters/:id", (req, res) => {
//    const id= +req.params.id;
//    characters = characters.map(char => char.id === id ? { ...char, ...req.body } : char)
//    res.status(201).send(characters.find(char => char.id));
// })


app.listen(3000);