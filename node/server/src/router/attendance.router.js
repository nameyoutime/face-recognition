const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();
const attendanceSchema = require('../../schemas/attendance.schemas');
const AttendanceDB = mongoose.model('Attendance', attendanceSchema);

router.get('/', async (req, res) => {
    let data = await AttendanceDB.find();
    res.send({ data: data })
})

router.post('/', async (req, res) => {
    let { attendance } = req.body;
    let result;
    let date = new Date();
    let temp = {
        ...attendance,
        date: date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    }
    let query = await AttendanceDB.find({ date: date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() })
    if (query.length == 0) {
        result = new AttendanceDB(temp);
        await result.save();
    } else {
        result = "already create on this day";
    }


    res.status(200).send({ data: result });
})
router.delete('/:id', async (req, res) => {
    let { id } = req.params;

    let data = await AttendanceDB.findByIdAndDelete(id);
    res.send({ data: data })
})

// router.get('/test', async (req, res) => {
//     let { id } = req.query;
//     let result = await AttendanceDB.findById(id).populate("arr.student");
//     let temp = result.arr;
//     let findIndex = temp.findIndex((val) => val.student.sid == 3);

//     console.log(findIndex);
//     res.send({ result: result });
// })
router.get('/id', async (req, res) => {
    let { id } = req.query;
    let data = "";
    try {
        data = await AttendanceDB.findById(id).populate('students');

    } catch (error) {
        data = "error"
    }
    res.send({ data: data })
})
router.put('/id', async (req, res) => {
    let { attendance } = req.body;
    let update = attendance;
    let result;
    let id = update.id;
    let temp = update.nameSid.split("-")
    let sid = temp[1];
    let fullName = temp[0];
    let find = await AttendanceDB.findById(id).populate("arr.student");
    let array = find.arr;
    let findIndex = array.findIndex((val) => val.student.sid == parseInt(sid) && val.student.fullName == fullName);
    if (findIndex => 0) {
        let set = array[findIndex]._id;
        result = await AttendanceDB.updateOne(
            { _id: mongoose.Types.ObjectId(id), "arr._id": mongoose.Types.ObjectId(set) },
            { $set: { "arr.$.absence": false, "arr.$.date": Date.now() } }
        )
    } else {
        result = "can't find students";
    }

    res.send({ result: result });
})
module.exports = router;