import mongoose from 'mongoose'

const image = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    }
})

const tracker = new mongoose.Schema({
    numericalT: {type: Number, required:true}
})

const chapter = new mongoose.Schema({
    text:{type: String, required: true},

})

const chapters = new mongoose.Schema({
    name: {type: String, required: true},
    text: [chapter],
    image: {type: image},
    entries: {type: Number, required: true}
})

const log = new mongoose.Schema({
    date: {type: Date, default: () => {
        const date = new Date();
        return date.toLocaleString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
      }}
})
  
const booksSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    chapters: [chapters],
    hasImage: {type:Boolean,default:false},
    date: log,
    due: {type:Date,default: Date.now()},
});

export const projectSchema = new mongoose.Schema({
    userKey: {type:String , required: true},
    books: [booksSchema]
})


