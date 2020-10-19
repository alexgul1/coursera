const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const authenticate = require('../authenticate');
const Favorites = require('../models/favorite');
const cors = require("./cors");

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route("/")
    .options(cors.corsWithOptions, (req, res) => {
      res.sendStatus(200);
    })
    .get(authenticate.verifyUser, (req, res, next) => {
      Favorites.findOne({user: req.user._id})
          .populate('user')
          .populate('dishes')
          .then((favorites) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorites);
          }, (err) => {
            next(err);
          })
          .catch((err) => {
            next(err);
          })
    })
    .post(authenticate.verifyUser, (req, res, next) => {
      Favorites.findOne({user: req.user._id})
          .then((favorites) => {
            if (!favorites) {
              Favorites.create({user: req.user._id, dishes: []})
                  .then((favorites) => {
                    req.body.forEach((favorite) => {
                      if (favorites.dishes.indexOf(favorite._id) === -1) {
                        favorites.dishes.push(favorite);
                      }
                    })
                    favorites.save()
                        .then((favorites) => {
                          Favorites.findById(favorites._id)
                              .populate('user')
                              .populate('dishes')
                              .then((favorites) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favorites);
                              })
                        })
                  })
            } else {
              req.body.forEach((favorite) => {
                if (favorites.dishes.indexOf(favorite._id) === -1) {
                  favorites.dishes.push(favorite);
                }
              })
              favorites.save()
                  .then((favorites) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorites);
                  })
            }
          }, (err) => {
            next(err)
          })
          .catch((err) => {
            next(err);
          })
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
      Favorites.findOneAndDelete({user: req.user._id})
          .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
          }, (err) => {
            next(err);
          })
          .catch((err) => {
            next(err);
          });
    })

favoriteRouter.route("/:dishId")
    .options(cors.corsWithOptions, (req, res) => {
      res.sendStatus(200);
    })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
      Favorites.findOne({user: req.user._id})
          .then((favorites) => {
            if (!favorites) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.json({"exists": false, "favorites": favorites});
            } else {
              if (favorites.dishes.indexOf(req.params.dishId) === -1) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({"exists": false, "favorites": favorites});
              } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({"exists": true, "favorites": favorites});
              }
            }
          }, (err) => {
            next(err);
          })
          .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
      Favorites.findOne({user: req.user._id})
          .then((favorites) => {
            if (!favorites) {
              Favorites.create({user: req.user._id, dishes: []})
                  .then((favorites) => {
                    favorites.dishes.push(req.params.dishId);
                    favorites.save()
                        .then((favorites) => {
                          Favorites.findById(favorites._id)
                              .populate('user')
                              .populate('dishes')
                              .then((favorites) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(favorites);
                              })
                        })
                  })
            } else {
              if (favorites.dishes.indexOf(req.params.dishId) === -1) {
                favorites.dishes.push(req.params.dishId);
                favorites.save()
                    .then((favorites) => {
                      Favorites.findById(favorites._id)
                          .populate('user')
                          .populate('dishes')
                          .then((favorites) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorites);
                          })
                    })
              } else {
                res.statusCode = 200;
                res.end("Favorite already added!")
              }
            }

          }, (err) => {
            next(err)
          })
          .catch((err) => {
            next(err);
          })
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
      Favorites.findOne({user: req.user._id})
          .then((favorites) => {
            const index = favorites.dishes.indexOf(req.params.dishId)
            if (index !== -1) {
              favorites.dishes.splice(index, 1);
              favorites.save()
                  .then((favorites) => {
                    Favorites.findById(favorites._id)
                        .populate('user')
                        .populate('dishes')
                        .then((favorites) => {
                          res.statusCode = 200;
                          res.setHeader('Content-Type', 'application/json');
                          res.json(favorites);
                        })
                  })
            } else {
              err = new Error(`Favorite ${req.params.dishId} not found`);
              err.status = 404;
              return next(err);
            }

          }, (err) => {
            next(err)
          })
          .catch((err) => {
            next(err);
          })
    })

module.exports = favoriteRouter;