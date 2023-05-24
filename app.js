process.env.ENVIRONMENT_PROCESS = 'DEVELOPMENT';
//process.env.ENVIRONMENT_PROCESS = 'PRODUCTION';

var express = require('express');
var cors = require('cors');
var path = require('path');

var PORT = process.env.ENVIRONMENT_PROCESS === 'DEVELOPMENT' ? 3333 : 8000;

var app = express();

var indexRouter = require('./src/routes/index');
var matchRouter = require('./src/routes/match');
var userRouter = require('./src/routes/user');
var crowdRouter = require('./src/routes/crowd');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    
    next();
});

app.use('/', indexRouter);
app.use("/match", matchRouter);
app.use("/user", userRouter);
app.use("/crowd", crowdRouter);

app.listen(PORT, () => console.log(`Server is running at: http://localhost:${PORT}! 
And you is using an ${process.env.ENVIRONMENT_PROCESS} environment`));
