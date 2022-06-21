module.exports = (app) => {
  const otonioinvierno = require('../controllers/otonioinvierno.controller.js')

  // Get all records
  app.get('/api/otonioinvierno', (req, res) => {
    otonioinvierno.findAll({ req, res })
  })

  // Search records
  app.get('/api/otonioinvierno/search', (req, res) => {
    otonioinvierno.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/otonioinvierno/:ID', (req, res) => {
    otonioinvierno.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/otonioinvierno', (req, res) => {
    otonioinvierno
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/otonioinvierno/:ID', (req, res) => {
    otonioinvierno
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/otonioinvierno/:ID', (req, res) => {
    otonioinvierno
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
