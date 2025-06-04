import mongoose from "mongoose";

const ChapterSchema=new mongoose.Schema({
    subject:
    {
        type:String,
        required:true,
    },
    chapter:
    {
        type:String,
        required:true,
        unique:true
    },
    class:
    {
        type:String,
        required:true
    },
    unit:
    {
        type:String,
        required:true
    },
    yearWiseQuestionCount:
    {
        type:Map,
        of:Number,
        default:{}
    },
    questionSolved: 
    { 
        type: Number, 
        default: 0 
    },
    status: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed'],
      default: 'Not Started',
    },
    isWeakChapter: { 
        type: Boolean, 
        default: false 
    },
});

export const Chapter=mongoose.model("Chapter",ChapterSchema);