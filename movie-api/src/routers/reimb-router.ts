import { Request, Response } from 'express';
import express from 'express';
import * as movieDao from '../dao/reimb-dao';
import { authMiddleware } from '../security/authorization-middleware';

// all routes defiend with this object will imply /movies
export const movieRouter = express.Router(); // routers represent a subset of routes for the express application


/**
 * Find all movies
 */
movieRouter.get('', [
  //authMiddleware('admin', 'customer'),
  async (req: Request, resp: Response) => {
    try {
      
      let movies = await movieDao.findAll(req.session.user.ers_users_id);
      resp.json(movies);
    } catch (err) {
      resp.sendStatus(500);
    }
  }]);

/**
 * Find movie by id
 */
movieRouter.get('/:id', async (req, resp) => {
  const id = +req.params.id; // convert the id to a number
  console.log(`retreiving movie with id  ${id}`)
  try {
    let movie = await movieDao.findById(id);
    if (movie !== undefined) {
      resp.json(movie);
    } else {
      resp.sendStatus(400);
    }
  } catch (err) {
    console.log(err);
    resp.sendStatus(500);
  }
});


/**
 * Create Movie
 */
movieRouter.post('', [
  //authMiddleware('admin'),
  async (req, resp) => {
    try {
      const id = await movieDao.createReimbursement(req.body, req.session.user.ers_users_id);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }])

  movieRouter.post('/approve', [
    //authMiddleware('admin', 'customer'),
    async (req: Request, resp: Response) => {
      try {
        
        let movies = await movieDao.approveReimb(req.body.choice);
        resp.json(movies);
      } catch (err) {
        resp.sendStatus(500);
      }
    }]);

    movieRouter.post('/deny', [
      //authMiddleware('admin', 'customer'),
      async (req: Request, resp: Response) => {
        try {
          
          let movies = await movieDao.denyReimb(req.body.choice);
          resp.json(movies);
        } catch (err) {
          resp.sendStatus(500);
        }
      }]);

