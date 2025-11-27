import express from 'express';
import * as enrollmentsModel from '../model/enrollmentsModel.js';
const enrollmentsRouter = express.Router();

//CRUD (Create, Read, Update, Delete) műveleteket REST végpontokon keresztül.