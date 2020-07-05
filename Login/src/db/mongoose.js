const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/portfolio?readPreference=primary&ssl=false", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false

}).catch( (error) => {
    console.log(error);
})