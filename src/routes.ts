import {Router} from "express";
import { SettingsController } from "./controllers/SettingsController";

/**
 * --Tipos de Parametros--
 * Routes Params => Parametros de Rotas { http://localhost:3333/settings/1}
 * 
 * Query Params => Filtros e buscas { http://localhost:3333/settings/1?search=games}
 * 
 * Body Params => Json {
 *                       "nome": bruna,
 *                       "idade": 12
 *                      } 
 * 
 */

const routes = Router();

const settingsController = new SettingsController();

routes.post("/settings", settingsController.create);

export {routes};