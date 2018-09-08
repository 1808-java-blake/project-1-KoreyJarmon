import { Request, Response } from 'express';
import express from 'express';
import * as reimbDao from '../dao/reimb-dao';
import { authMiddleware } from '../security/authorization-middleware';

// all routes defiend with this object will imply /movies
export const reimbRouter = express.Router(); // routers represent a subset of routes for the express application



reimbRouter.get('', [
  //authMiddleware('admin', 'customer'),
  async (req: Request, resp: Response) => {
    try {
      let movies = await reimbDao.findAll();
      resp.json(movies);
    } catch (err) {
      resp.sendStatus(500);
    }
  }]);


reimbRouter.get('/id', [
  async (req: Request, resp: Response) => {
  //const id = +req.params.id; // convert the id to a number
  try {
    let reimb = await reimbDao.findById(req.session.user.ers_users_id);
    if (reimb !== undefined) {
      resp.json(reimb);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
}]);


/**
 * Create Movie
 */
reimbRouter.post('', [
  //authMiddleware('admin'),
  async (req, resp) => {
    try {
      const id = await reimbDao.createReimbursement(req.body, req.session.user.ers_users_id);
      // const id = await movieDao.createReimbursement(req.body,4);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }])

  reimbRouter.post('/approve', [
    //authMiddleware(1),
    async (req: Request, resp: Response) => {
      try {
        console.log(req.body.choice);
        let reimbs = await reimbDao.approveReimb(req.body.choice);
        resp.json(reimbs);
      } catch (err) {
        resp.sendStatus(500);
      }
    }]);

    reimbRouter.post('/deny', [
      //authMiddleware(1),
      async (req: Request, resp: Response) => {
        try {
          
          let reimbs = await reimbDao.denyReimb(req.body.choice);
          resp.json(reimbs);
        } catch (err) {
          resp.sendStatus(500);
        }
      }]);

