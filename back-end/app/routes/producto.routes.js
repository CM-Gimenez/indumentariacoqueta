module.exports = (app) => {
  const producto = require('../controllers/producto.controller.js')

  // Get all records
  app.get('/api/producto', (req, res) => {
    producto.findAll({ req, res })
  })

  // Search records
  app.get('/api/producto/search', (req, res) => {
    producto.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/producto/:ID', (req, res) => {
    producto.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/producto', (req, res) => {
    producto
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/producto/:ID', (req, res) => {
    producto
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/producto/:ID', (req, res) => {
    producto
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
