import express from 'express'

import {
    getUsers,
    getUser,
    createUser,
    getAnimals,
    getAnimal,
    getSightings,
    getSighting,
    loginUser,
    changeUserRole

} from './database.js'
const app = express();

const baseURL = '192.168.43.136'

app.use(express.json())

app.get(`/users`, async (req, res) => {
    const notes = await getUsers()
    res.send(notes)
})

app.get("/animals", async (req, res) => {
    const notes = await getAnimals()
    res.send(notes)
})

app.get("/sightings", async (req, res) => {
    const notes = await getSightings()
    res.send(notes)
})


app.get("/users/:id", async (req, res) => {
    const id = req.params.id
    const note = await getUser(id)
    res.send(note)
})

app.get("/animals/:id", async (req, res) => {
    const id = req.params.id
    const note = await getAnimal(id)
    res.send(note)
})

app.get("/sightings/:id", async (req, res) => {
    const id = req.params.id
    const note = await getSighting(id)
    res.send(note)
})

app.post("/users/login", async (req, res) => {
    const { username, password } = req.body
    const result = await loginUser(username, password)
    res.status(201).send(result)
})

app.post("/users", async (req, res) => {
    const { username, email, password } = req.body
    const note = await createUser(username, email, password)
    res.status(201).send(note)
})

app.patch("/users/changeRole/:id", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { newRole } = req.body;
    changeUserRole(userId, newRole);
})

app.post("/animals", async (req, res) => {
    const { name, } = req.body
    const note = await createUser(username, email, password)
    res.status(201).send(note)
})

app.post("/sightings", async (req, res) => {
    const { username, email, password } = req.body
    const note = await createUser(username, email, password)
    res.status(201).send(note)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something wrong..')
})


app.listen(3306, baseURL, () => {
    console.log('Server is running on port 3306')
})