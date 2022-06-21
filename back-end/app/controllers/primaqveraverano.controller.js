const Primaqveraverano = require('../models/primaqveraverano.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new SingleUntitled
exports.create = async (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (typeof data.Name !== 'undefined') updatedData['Name'] = data.Name

  if (typeof data.Marca !== 'undefined') updatedData['Marca'] = data.Marca

  if (typeof data.Desription !== 'undefined') updatedData['Desription'] = data.Desription

  if (typeof data.Price !== 'undefined') updatedData['Price'] = data.Price

  // Create a SingleUntitled
  const SingleUntitled = new Primaqveraverano(updatedData)

  // Save SingleUntitled in the database
  SingleUntitled.save()
    .then((data) => {
      exports.findOne({ ID: data._id, res: options.res })
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while saving the record.',
      })
    })
}

exports.createAsPromise = (options) => {
  return new Promise(async (resolve, reject) => {
    const data = options.req ? options.req.body : options.data
    const updatedData = {}
    if (data._id) updatedData._id = data._id

    if (typeof data.Name !== 'undefined') updatedData['Name'] = data.Name

    if (typeof data.Marca !== 'undefined') updatedData['Marca'] = data.Marca

    if (typeof data.Desription !== 'undefined') updatedData['Desription'] = data.Desription

    if (typeof data.Price !== 'undefined') updatedData['Price'] = data.Price

    // Create a SingleUntitled
    const SingleUntitled = new Primaqveraverano(updatedData)

    // Save SingleUntitled in the database
    SingleUntitled.save()
      .then((result) => {
        if (options.skipfind) {
          resolve(result)
        } else {
          exports.findOne({ ID: result._id, res: options.res }).then((result) => {
            resolve(result)
          })
        }
      })
      .catch((err) => {
        reject(errors.prepareError(err))
      })
  })
}

// Retrieve and return all Primaqveraverano from the database.
exports.findAll = (options) => {
  const query = options.query ? options.query : options.req.query
  if (typeof query.populate === 'undefined') query.populate = 'true'
  const data = options.req ? options.req.body : options.data
  if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

  const findString = {}
  if (query.fixedSearch) {
    query.fixedSearch = JSON.parse(query.fixedSearch)
    findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
  }

  Primaqveraverano.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .then((primaqveraverano) => {
      options.res.json(paginate.paginate(primaqveraverano, { page: query.page, limit: query.limit || 10 }))
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while retrieving records.',
      })
    })
}

exports.find = (options) => {
  return new Promise((resolve, reject) => {
    const query = options.query ? options.query : options.req.query
    const data = options.req ? options.req.body : options.data
    let findString = query.searchString ? { $text: { $search: query.searchString } } : {}
    if (query.searchField) {
      if (Primaqveraverano.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Primaqveraverano.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (
        Primaqveraverano.schema.path(query.searchField).instance === 'ObjectID' ||
        Primaqveraverano.schema.path(query.searchField).instance === 'Array'
      ) {
        findString = { [query.searchField]: require('mongoose').Types.ObjectId(query.searchString) }
      }
    } else if (query.filters) {
      query.filters.forEach((filter) => {
        const parsed = typeof filter === 'string' ? JSON.parse(filter) : filter
        findString[parsed.field] = parsed.value
      })
    }
    if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

    if (query.fixedSearch) {
      query.fixedSearch = JSON.parse(query.fixedSearch)
      findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
    }

    Primaqveraverano.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .then((singleuntitled) => {
        resolve(paginate.paginate(singleuntitled, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single SingleUntitled with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Primaqveraverano.findById(id)

      .then((singleuntitled) => {
        if (!singleuntitled) {
          return options.res.status(404).send({
            message: 'SingleUntitled not found with id ' + id,
          })
        }
        resolve(paginate.paginate([singleuntitled]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'SingleUntitled not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving SingleUntitled with id ' + id,
        })
      })
  })
}

// Update a singleuntitled identified by the ID in the request
exports.update = (options) => {
  return new Promise(async (resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (typeof data.Name !== 'undefined') updatedData['Name'] = data.Name

    if (typeof data.Marca !== 'undefined') updatedData['Marca'] = data.Marca

    if (typeof data.Desription !== 'undefined') updatedData['Desription'] = data.Desription

    if (typeof data.Price !== 'undefined') updatedData['Price'] = data.Price

    // Find Single Untitled  and update it with the request body
    const query = { populate: 'true' }
    Primaqveraverano.findByIdAndUpdate(id, updatedData, { new: true })

      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Delete a singleuntitled with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Primaqveraverano.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
