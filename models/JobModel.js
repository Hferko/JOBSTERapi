const mongoose = require('mongoose')

const JobSchema = mongoose.Schema({
  company:{
    type:String,
    required:[true, 'Adja meg a vállalat nevét'],
    maxlength:50
  },
  position:{
    type:String,
    required:[true, 'Adja meg a pozíciót'],
    maxlength:100
  },
  status:{
    type:String,
    enum:['interview', 'elutasítva', 'függőben'],
    default:'függőben'
  },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true, 'Adja meg a usert'],
  },
  jobType:{
    type:String,
    enum:['teljes munkaidő', 'részidős', 'távmunka', 'gyakornok'],
    default: 'teljes munkaidő',
  },
  jobLocation:{
    type: String,
    default:'az én városom',
    required:true,
  }
}, {timestamps:true})

module.exports = mongoose.model('Job', JobSchema)