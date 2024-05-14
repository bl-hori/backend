import cors from 'cors'
import 'dotenv/config'
import express, { type Request, type Response } from 'express'
import { knex } from './db'

type Note = {
    id: number | null,
    text: string,
    updatedAt: number,
}

const port = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log(`server listen http://localhost:${port}`)
})

app.get("/api/notes", async (req: Request, res: Response) => {
    try {
        const notes = await knex('notes').select('*').orderBy('updatedAt', 'desc')
        res.status(200).send(notes)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})

app.post("/api/notes", async (req: Request, res: Response) => {
    try {
        const note:Note = {id: null, text:'New Note', updatedAt:Date.now()};
        const result = await knex('notes').insert(note);
        note.id = result[0];
        res.status(200).send(note)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})

app.put("/api/notes/:id", async (req: Request, res: Response) => {
    try {
        const updateNote = {
            id: req.params.id,
            text: req.body.text,
            updatedAt: Date.now(),
        }
        await knex('notes').where({ id: updateNote.id }).update(updateNote);

        res.status(200).send(updateNote)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})

app.delete("/api/notes/:id", async (req: Request, res: Response) => {
    try {
        await knex('notes').where({ id: req.params.id }).del();

        res.status(200).send();
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        }
    }
})