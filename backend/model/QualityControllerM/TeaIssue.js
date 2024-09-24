
const mongoose = require('mongoose');


const teaIssueSchema = new mongoose.Schema({
  teaType: { 
    type: String, 
    required: true 
  },
  teaGrade: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
});


const TeaIssue = mongoose.model('TeaIssue', teaIssueSchema);


module.exports = TeaIssue;
