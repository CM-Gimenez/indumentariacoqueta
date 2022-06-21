module.exports = (app) => {
  const primaqveraverano = require('../controllers/primaqveraverano.controller.js')

  // Get all records
  app.get('/api/primaqveraverano', (req, res) => {
    primaqveraverano.findAll({ req, res })
  })

  // Search records
  app.get('/api/primaqveraverano/search', (req, res) => {
    primaqveraverano.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/primaqveraverano/:ID', (req, res) => {
    primaqveraverano.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/primaqveraverano', (req, res) => {
    primaqveraverano
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/primaqveraverano/:ID', (req, res) => {
    primaqveraverano
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/primaqveraverano/:ID', (req, res) => {
    primaqveraverano
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
