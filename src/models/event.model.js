import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
    eventBy : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"alumniprofiles"
    },
    eventTotalCapacity :{
        type:Number,
        required:true
    },
    eventImage : {
        type:String
    },
    eventTitle : {
        type:String,
    },
    eventTags :  [
        {
            type:String,
        }
    ],
    

});

const eventModel =
  mongoose.models.events || mongoose.model("events", EventSchema);

export default eventModel;
