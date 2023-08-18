import express from 'express';

export class Router {
  private static instance: express.Router;

  static getInstance(): express.Router {
    if (!Router.instance) {
      Router.instance = express.Router();
    }
    return Router.instance;
  }
}