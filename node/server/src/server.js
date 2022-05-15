const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const server = express();
server.use(cors());
server.use(bodyParser.json());
// router
const student = require('./router/student.router');
const attendance = require('./router/attendance.router');
const teacher = require('./router/teacher.router');
const classes = require('./router/class.router');








server.use("/api/student", student);
server.use("/api/attendance", attendance);
server.use("/api/teacher", teacher);
server.use("/api/class", classes);




module.exports = server;