import express, { request, response } from 'express';

const app = express();

/**
 * GET = Buscas
 * POST = Criação
 * PUTH = Alteração
 * DELETE = DELETAR
 * PATCH = Alterar uma Informação Especifica 
 */
app.get("/",(request, response) =>{
    return  response.send("Olá Mundo :)")
})

app.post("/",(request, response) =>{
    return response.json({message: "Hello Word :)"})
})

app.listen(3333, () => console.log('Ta Rodando :)'));