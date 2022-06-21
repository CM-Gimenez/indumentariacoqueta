const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const OtonioinviernoSchema = mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Marca: {
      type: String,
    },
    Description: {
      type: String,
    },
    Price: Number,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

OtonioinviernoSchema.plugin(mongoosePaginate)
OtonioinviernoSchema.index({
  Name: 'text',
  Marca: 'text',
  Description: 'text',
  Price: 'text',
})

const myModel = (module.exports = mongoose.model('Otonioinvierno', OtonioinviernoSchema, 'otonioinvierno'))
myModel.schema = OtonioinviernoSchema
