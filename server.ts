import * as mongoose from "mongoose";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as exphb from "express-handlebars";
import * as session from "express-session";
import * as flash from "express-flash";
import * as cookieParser from "cookie-parser";

class Server {
    public app : express.Application;

    constructor(public port: number) {
        this.app = express();
        this.config();
        this.startServer(port);    
    }

    public config() : void {
        //mongoose
        const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/waiter_app_ts";
        
        //connect to mongodb
        mongoose.connect(mongoURL);

        //Handlebars
        //init Handlebars
        this.app.engine('handlebars', exphb({defaultLayout: 'main'}));
        this.app.set('view engine', 'handlebars');

        //init body parser  
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        //express - flash messages and session
        this.app.use(cookieParser('keyboard cat'));
        this.app.use(session({ cookie: { maxAge: 60000 }}));
        this.app.use(flash());
        
        //Stacic Files
        this.app.use(express.static('public'));
    }

    public startServer(port: number) {
        this.app.listen(port, () => console.log("Server running at http://localhost:" + port));
    }   
}

export default Server;
