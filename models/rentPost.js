const mongoose = require("mongoose");
const rentSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  address: {
    type: String,
  },
  price: {
    type: String,
  },
  plan: {
    type: String,
  },
  landlord: {
    type: String,
  },
  amenities: [{
    type: String,
  }],
  images:[ {
    type: String,
  }],
  cloudinary_id:[ {
    type: String,
  }],

});
rentSchema.set("toJSON", {
  transform:(document, returnedObject) =>{
      returnedObject.id = returnedObject._id.toString(),
      delete returnedObject._id;
      delete returnedObject.__v;
     
  },
  });

module.exports = mongoose.model("Rent", rentSchema);
