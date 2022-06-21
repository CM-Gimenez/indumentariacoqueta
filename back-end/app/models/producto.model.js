const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ProductoSchema = mongoose.Schema(
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
    image: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

ProductoSchema.plugin(mongoosePaginate)
ProductoSchema.index({
  Name: 'text',
  Marca: 'text',
  Description: 'text',
  Price: 'text',
  image: 'text',
})

const myModel = (module.exports = mongoose.model('Producto', ProductoSchema, 'producto'))
myModel.schema = ProductoSchema
