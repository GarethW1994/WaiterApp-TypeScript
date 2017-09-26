import { Request, Response, NextFunction } from "express";
import * as flash from "express-flash";
import * as exphb from "express-handlebars";
import * as _ from "lodash";

//import Model
import Waiters from "../models/models";

interface IUser {
    waiter_username: string;
    waiter_password: string;
    waiter_days: Object;
}

class Routes {
    index = (req: Request, res: Response, next: NextFunction): void => {
        res.redirect('/login');
    }

    login = (req: Request, res: Response, next: NextFunction): void => {
        res.render("login");
    }

    getUserName = (req: Request, res: Response, next: NextFunction): void => {
        var username: string = req.body.username;
        var password: string = req.body.password;

        var newUser: IUser = {
            waiter_username: username,
            waiter_password: password,
            waiter_days: []
        }

        Waiters
        .create(newUser, (err, result) => {
            if (err) {
                if (err.code == 11000) {
                    res.redirect("/waiters/" + username);
                }
            }
        })
        .then((result) => {
            console.log(result);
            res.redirect("/waiters/" + username);
        })
    }

    selectDays = (req: Request, res: Response, next: NextFunction): void => {
        const dayArr: Object = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];        
       
        var username: string = req.params.username;
        
        Waiters
        .find({waiter_username: username}, (err, result) => {
            if (err) {return next(err)};
            console.log(result.waiter_days);
        })
        .then((result) => {
            var selectedDays: object = {};

            result[0].waiter_days.forEach((day) => {
                    if (selectedDays[day] === undefined) {
                        selectedDays[day] = 0;
                    } 
                    selectedDays[day] += 1;
            });

            res.render("selectDays", {username: username, userDays: selectedDays});
        });        
    }

    getDays = (req: Request, res: Response, next: NextFunction): void => {
        const dayArr: Object = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];        
        
        Waiters.find({}, (err, data) => {
            if (err) {return next(err)};
        })
        .then((data) => {
        
            res.render("getDays", {waiter: data, day: dayArr});
        });
    }

    postDays = (req: Request, res: Response, next: NextFunction): void => {
        var username : string = req.params.username; 
        var days = req.body.days;

        Waiters
        .find({waiter_username: username},(err, waiter) => {
            if (err) {return next(err)};
            console.log(waiter);
        })
        .then((waiter) => {
            waiter[0].waiter_days = days;                        
            
            waiter[0].save()
            .then(() => {
                req.flash("success", "Updated Days Successfully");
                res.redirect('/waiters/' + username);            
            });
        });
    }
}

export default new Routes();