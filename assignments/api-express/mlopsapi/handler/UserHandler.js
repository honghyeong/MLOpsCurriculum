const UserModel = require("../model/UserModel");

// status code 추가 필요

class UserHandler {
  constructor() {
    this.model = new UserModel();
  }

  create(req, res) {
    let user = req.body;
    this.model
      .create(user)
      .then(function (data) {
        res.json({
          success: true,
        });
      })
      .catch(function (error) {
        res.json({
          success: false,
        });
      });
  }

  read(req, res) {
    let id = req.params.id;

    this.model
      .read(id)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (error) {
        res.json({
          success: false,
        });
      });
  }

  readAll(req, res) {
    this.model
      .readAll()
      .then(function (data) {
        res.json(data);
      })
      .catch(function (error) {
        res.json({
          success: false,
        });
      });
  }

  update(req, res) {
    let id = req.params.id;
    let user = req.body;

    this.model
      .update(id, user)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (errpr) {
        res.json({
          success: false,
        });
      });
  }

  delete(req, res) {
    let id = req.params.id;

    this.model
      .delete(id)
      .then(function (data) {
        res.json(data);
      })
      .catch(
        res.json({
          success: false,
        })
      );
  }
}
