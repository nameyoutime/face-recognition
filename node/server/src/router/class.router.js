const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();
const ClassSchema = require('../../schemas/Class.schemas');
const ClassDB = mongoose.model('Class', ClassSchema);

router.get('/', async (req, res) => {
    try {
        let data = await ClassDB.find();
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }

})

router.post('/', async (req, res) => {
    let { classes } = req.body;
    let temp = {
        ...classes,
        date: Date.now()
    }

    try {
        let result = new ClassDB(temp);
        await result.save();
        res.status(200).send({ data: result });
    } catch (error) {
        res.send({ error: error });
    }

})

router.put('/:id', async (req, res) => {
    let { id } = req.params;
    let { classes } = req.body;
    let temp = {
        ...classes
    }
    try {
        let result = await ClassDB.findByIdAndUpdate(id, temp);
        res.status(200).send({ data: result });
    } catch (error) {
        res.send({ error: error });
    }

})


router.get('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let data = await ClassDB.findById(id);
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }

})
router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let data = await ClassDB.findByIdAndDelete(id);
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }

})
router.get('/student/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let data = await ClassDB.find({student:mongoose.Types.ObjectId(id)});
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }

})

router.get('/teacher/:id', async (req, res) => {
    let { id } = req.params;
    try {
        let data = await ClassDB.find({teacher:mongoose.Types.ObjectId(id)});
        res.send({ data: data })
    } catch (error) {
        res.send({ error: error })
    }

})

module.exports = router;