const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();
const teacherSchema = require('../../schemas/teacher.schemas');
const TeacherDB = mongoose.model('Teacher', teacherSchema);

router.get('/', async (req, res) => {
    let data = await TeacherDB.find();
    res.send({ data: data })
})


router.post('/', async (req, res) => {
    let { teacher } = req.body;
    let temp = {
        ...teacher
    }
    let result = new TeacherDB(temp);
    await result.save();
    res.status(200).send({ data: result });
})
router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let data = await TeacherDB.findById(id);
    res.send({ data: data })
})
router.put('/:id', async (req, res) => {
    let { id } = req.params;
    let { teacher } = req.body;
    await TeacherDB.findByIdAndUpdate(id,{
        userName:teacher.userName,
        password:teacher.password,
        fullName:teacher.fullName,
        role:teacher.role
    }) 
    res.send({ data: "sucess" })
})

router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    let data = await TeacherDB.findByIdAndDelete(id);
    res.send({ data: data })
})


router.get('/login', async (req, res) => {
    let { userName, password } = req.query;
    let data = await TeacherDB.find({ $and: [{userName:userName},{password:password}] });
    res.send({ data: data })
})


module.exports = router;