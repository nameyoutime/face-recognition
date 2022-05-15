const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();
const ClassSchema = require('../../schemas/Class.schemas');
const ClassDB = mongoose.model('Class', ClassSchema);

router.get('/', async (req, res) => {
    let data = await ClassDB.find();
    res.send({ data: data })
})

router.post('/', async (req, res) => {
    let { classes } = req.body;
    let temp = {
        ...classes,
        date: Date.now()
    }
    
    let result = new ClassDB(temp);
    await result.save();
    res.status(200).send({ data: result });
})

router.put('/:id', async (req, res) => {
    let { id } = req.params;
    let { classes } = req.body;
    let temp = {
        ...classes
    }
    
    let result = await ClassDB.findByIdAndUpdate(id,temp);
    res.status(200).send({ data: result });
})


router.get('/:id', async (req, res) => {
    let { id } = req.params;

    let data = await ClassDB.findById(id);
    res.send({ data: data })
})
router.delete('/:id', async (req, res) => {
    let { id } = req.params;

    let data = await ClassDB.findByIdAndDelete(id);
    res.send({ data: data })
})

module.exports = router;