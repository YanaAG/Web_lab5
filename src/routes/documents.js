const express = require('express');
const router = express.Router();

const Document = require('../models/doc');

router.get('/', async (req, res) => {
   const documents = await Document.find();
   res.json(documents);
});

router.post('/', async (req, res) =>{
   const doc = new Document(req.body);
   await doc.save();
   res.json({
      status: 'Document saved'
   });
});

router.put('/:id', async (req, res) =>{
   await Document.findByIdAndUpdate(req.params.id, req.body);
   res.json({
      status: 'Document updated'
   });
});

router.delete('/:id', async (req, res) =>{
   await Document.findByIdAndRemove(req.params.id);
   res.json({
      status: 'Document deleted'
   });
});

module.exports = router;
