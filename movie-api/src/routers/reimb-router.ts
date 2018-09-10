import { Request, Response } from 'express';
import express from 'express';
import * as reimbDao from '../dao/reimb-dao';
import { authMiddleware } from '../security/authorization-middleware';


export const reimbRouter = express.Router(); 



reimbRouter.get('', [
  authMiddleware(1),
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



reimbRouter.post('', [

  async (req, resp) => {
    try {
      const id = await reimbDao.createReimbursement(req.body, req.session.user.ers_users_id);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }])

  reimbRouter.post('/approve', [
   // authMiddleware(1),
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
     // authMiddleware(1),
      async (req: Request, resp: Response) => {
        try {
          
          let reimbs = await reimbDao.denyReimb(req.body.choice);
          resp.json(reimbs);
        } catch (err) {
          resp.sendStatus(500);
        }
      }]);

