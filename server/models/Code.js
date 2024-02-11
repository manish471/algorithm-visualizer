const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema({
    code: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default:'default code'
    },
    language:{
      type: String,
      default:'Javascript'
    },
    defaultCode:{
      type: Boolean,
    },
    dsStringValue: {
      type: String,
      default:''
    },
    datastructures: {
      type: Object,
      default:{LinkedList:'',DoublyLinkedList:'',BinaryTree:'',Graph:''}
    },
    googleID: {
      type: String
    },
    githubID: {
      type: String
    },
  });

module.exports = mongoose.model("Code", CodeSchema);
