const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const PrimaqveraveranoSchema = mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Marca: {
      type: String,
    },
    Desription: {
      type: String,
    },
    Price: Number,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

PrimaqveraveranoSchema.plugin(mongoosePaginate)
PrimaqveraveranoSchema.index({
  Name: 'text',
  Marca: 'text',
  Desription: 'text',
  Price: 'text',
})

const myModel = (module.exports = mongoose.model('Primaqveraverano', PrimaqveraveranoSchema, 'primaqveraverano'))
myModel.schema = PrimaqveraveranoSchema
