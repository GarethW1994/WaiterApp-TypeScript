//import server
import Server from "./server";
//import routes
import Routes from "./src/routes/routes";

//define port
var port: number = 3000;
//start server
var server = new Server(port);

server.app.get("/", Routes.index);

server.app.get("/login", Routes.login);

server.app.get("/waiters/:username", Routes.selectDays);

server.app.get("/getDays", Routes.getDays);

server.app.post("/getUser", Routes.getUserName);

server.app.post("/waiters/:username", Routes.postDays);

