import { Request, Response } from 'express';
import express from 'express';
import * as userDao from '../dao/user-dao';
import { authMiddleware } from '../security/authorization-middleware';

// all routes defiend with this object will imply /movies
export const userRouter = express.Router(); // routers represent a subset of routes for the express application


/**
 * Add a new user
 */
userRouter.post('', async (req, resp) => {
  authMiddleware(1),
  console.log('creating user')
  try {
    const id = await userDao.create(req.body);
    resp.status(201);
    resp.json(id);
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})

userRouter.post('/login', async (req, resp) => {

  try {
    const user = await userDao.findByUsernameAndPassword(req.body.username, req.body.password);
    if (user) {
      req.session.user = user;
      resp.json(user);
    } else {
      resp.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
})