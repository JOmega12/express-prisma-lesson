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

// CREATE ENDPOINT / POST ENDPOINT
app.post("/characters", async (req, res) => {
   const body = req.body;
   const name = body?.name;
   if(typeof name !== "string") {
      return res.status(400).send({error: "Name must be a string"})
   }
   try {
      const newCharacters = await prisma.character.create({
         data: {
            name,
         }
      })
      res.status(201).send(newCharacters)
   } catch(e) {
      console.error(e)
      return res.status(500).send({ error: "Name must be unique" })
   }
   // res.status(201).send(req.body);
   // res.send('yay!')
})

// same this as post but validate the type
app.patch("/characters/:id", async(req, res) => {
   const id= +req.params.id;
   // characters = characters.map(char => char.id === id ? { ...char, ...req.body } : char)
   if(typeof id !== 'number') {
      return res.status(400).send({error: "Id must be a number"})
   }
   try{
      const body = req.body;
      const updatedCharacters = await prisma.character.update({
         where:{ id },
         data: body,
      })
      res.status(201).send(updatedCharacters)
   }catch(e) {
      console.error(e);
      return res.status(400).send({ error: 'Failed to Update Character'})
   }
   
})


app.listen(3000);