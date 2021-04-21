import express from 'express';

import "./database";

import { routes } from "./routes";

/**
 * GET = Buscas
 * POST = Criação
 * PUTH = Alteração
 * DELETE = DELETAR
 * PATCH = Alterar uma Informação Especifica 
 */

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log('Ta Rodando :)'));