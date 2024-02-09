import express from 'express'
import { test, register, login, update, deleteU, registerA } from './animal.controller';

const api = express.Router();

api.post('/registerA', registerA)

export default api 