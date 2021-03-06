var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var files = require("./routes/files");
var auth = require("./routes/files");
var api = require("./routes/api");
let verifyToken = require("./middlewares/verifyToken");
let permission = require("./middlewares/permission");
var cors = require("cors");

var app = express();

app.use(cors());

/*app.use(function(req, res, next) {
  if ('OPTIONS' == req.method) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', '*');
   res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
   //next();
   res.send(200);
 } else {
   next();
 }
});*/

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: false,
        parameterLimit: 50000
    })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index, files, auth);
app.use("/api", api);

app.set("models", require("./models"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    //console.log('request', req);
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

var http = require("http");
var server = http.createServer(app);
server.listen(1337);