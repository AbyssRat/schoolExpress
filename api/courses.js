import express from 'express';
import * as coursesModel from '../model/coursesModel.js';
const coursesRouter = express.Router();

//CRUD (Create, Read, Update, Delete) műveleteket REST végpontokon keresztül.