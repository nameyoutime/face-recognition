const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const studentSchema = require('../../schemas/student.schemas');
const StudentDB = mongoose.model('Student', studentSchema);

router.get('/', async (req, res) => {
    let data = await StudentDB.find();
    res.send({ data: data })
})
router.post('/', async (req, res) => {
    let { student } = req.body;
    let result;

    let query = await StudentDB.find({ 'fullName': { "$in": student.fullName } }).count();
    if (query <= 0) {
        let count = await StudentDB.countDocuments();
        let temp = {
            ...student,
            sid: count + 1
        }
        result = new StudentDB(temp);
        await result.save();
    } else {
        result = "already exist";
    }

    res.status(200).send({ data: result });
})

router.get('/:sid', async (req, res) => {
    let { sid } = req.params;
    let result = await StudentDB.find({ sid: sid });
    res.send({ result: result });
})
router.put('/:sid', async (req, res) => {
    let { sid } = req.params;
    let { student } = req.body;
    await StudentDB.findOneAndUpdate({ sid: sid }, {
        fullName: student.fullName,
        description: student.description
    })
    res.send({ result: "susccess" });
})

router.delete('/:sid', async (req, res) => {
    let { sid } = req.params;
    await StudentDB.findOneAndRemove({sid:sid})
    res.send({ result: "susccess" });
})

module.exports = router;