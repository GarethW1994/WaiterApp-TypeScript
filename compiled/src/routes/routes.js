"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import Model
var models_1 = require("../models/models");
var Routes = /** @class */ (function () {
    function Routes() {
        this.index = function (req, res, next) {
            res.redirect('/login');
        };
        this.login = function (req, res, next) {
            res.render("login");
        };
        this.getUserName = function (req, res, next) {
            var username = req.body.username;
            var password = req.body.password;
            var newUser = {
                waiter_username: username,
                waiter_password: password,
                waiter_days: []
            };
            models_1.default
                .create(newUser, function (err, result) {
                if (err) {
                    if (err.code == 11000) {
                        res.redirect("/waiters/" + username);
                    }
                }
            })
                .then(function (result) {
                console.log(result);
                res.redirect("/waiters/" + username);
            });
        };
        this.selectDays = function (req, res, next) {
            var dayArr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            var username = req.params.username;
            models_1.default
                .find({ waiter_username: username }, function (err, result) {
                if (err) {
                    return next(err);
                }
                ;
                console.log(result.waiter_days);
            })
                .then(function (result) {
                var selectedDays = {};
                result[0].waiter_days.forEach(function (day) {
                    if (selectedDays[day] === undefined) {
                        selectedDays[day] = 0;
                    }
                    selectedDays[day] += 1;
                });
                res.render("selectDays", { username: username, userDays: selectedDays });
            });
        };
        this.getDays = function (req, res, next) {
            var dayArr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            models_1.default.find({}, function (err, data) {
                if (err) {
                    return next(err);
                }
                ;
            })
                .then(function (data) {
                res.render("getDays", { waiter: data, day: dayArr });
            });
        };
        this.postDays = function (req, res, next) {
            var username = req.params.username;
            var days = req.body.days;
            models_1.default
                .find({ waiter_username: username }, function (err, waiter) {
                if (err) {
                    return next(err);
                }
                ;
                console.log(waiter);
            })
                .then(function (waiter) {
                waiter[0].waiter_days = days;
                waiter[0].save()
                    .then(function () {
                    req.flash("success", "Updated Days Successfully");
                    res.redirect('/waiters/' + username);
                });
            });
        };
    }
    return Routes;
}());
exports.default = new Routes();
