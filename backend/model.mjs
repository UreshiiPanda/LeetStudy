import mongoose from 'mongoose';
import 'dotenv/config';

console.log("MONGO DB URI: ", process.env.mongo_db_uri);
console.log("PORT: ", process.env.port);

// Connect to a MongoDB Docker Container or to a MongoDB Atlas Cluster
mongoose.connect(
    process.env.mongo_db_uri, 
    { useNewUrlParser: true }
);

// this is a variable for connecting to the DB
const leetcode_db = mongoose.connection;


// connect to the DB using your DB variable via .once()
// Confirm that the database has connected, print success to console
leetcode_db.once("open", (error) => {
    if (error) {
        res.status(500).json( {Error: "Cannot connect to LeetCode collection in MongoDB Atlas."} );
    } else {
    console.log("Successfully connected to the LeetCode collection in MongoDB Atlas using Mongoose.");
    }
});


// Define the Collection's Schema.
const LeetCodeSchema = mongoose.Schema({
    patternKey: {type: String, required: true, default: "patternKey"},
    patternName: { type: String, required: true, default: "patternName" },
    patternInfo: { type: Array, required: true, default: ["patternInfo"] },
    patternMoreInfo: { type: Array, required: true, default: ["patternMoreInfo"] },
    patternSources: { type: Array, required: true, default: ["patternSources"] }
    },
    {versionKey: false}
);


// define a Model variable for a Document
// this passes in a name (for the Collection) and the schema that the Documents in that Collection will follow
const leetcode = mongoose.model("LeetCode", LeetCodeSchema);


//   CREATE MODELS     ##################################################
// define a model to create a Document in your new Collection
const createLeetCodeDoc = async (patternKey, patternName, patternInfo, patternMoreInfo, patternSources) => {
    // create an instance of the LeetCode Model from above
    const leetCodeEntry = new leetcode({ 
        patternKey: patternKey,
        patternName: patternName,
        patternInfo: patternInfo,
        patternMoreInfo: patternMoreInfo,
        patternSources: patternSources
    });
    // call save to persist/save this obj as a Document in MongoDB
    return leetCodeEntry.save();
}


//  RETRIEVE MODELS     #########################################
// define a model to retrieve Docs from the Collection via a filter
// Retrieve based on a filter and return a promise.
const getLeetCode = async () => {
    const query = leetcode.find();
    return query.exec();
}


// define a model to retrieve Docs from the Collection via Name field
// Retrieve based on the Name field and return a promise.
const getLeetCodeByName = async ( patternKey ) => {                 // get by KEY
    const query = leetcode.findOne( {patternKey: patternKey} );
    return query.exec();
}


//  UPDATE MODELS      ##############################################
// define a model to update a Doc
// replaceOne()   this can only replace an entire Doc
// updateOne()    this allows for updating fields within the Doc
const updateLeetCode = async (_id, patternKey, patternName, patternInfo, patternMoreInfo, patternSources) => {
    const result = await leetcode.replaceOne( 
        {_id: _id }, 
        {
            patternKey: patternKey,
            patternName: patternName,
            patternInfo: patternInfo,
            patternMoreInfo: patternMoreInfo,
            patternSources: patternSources
        }
        );
    return {
        _id: _id,
        patternKey: patternKey,
        patternName: patternName,
        patternInfo: patternInfo,
        patternMoreInfo: patternMoreInfo,
        patternSources: patternSources
    }
};


//  DELETE MODELS       ##############################################
// define a model to delete a single Doc based on the Key
const deleteLeetCodeById = async (_id) => {
    const result = await leetcode.deleteOne( {_id: _id} );
    return result.deletedCount;               // just for logging purposes
};


// Export these Model variables for use in the Controller file
export { createLeetCodeDoc, getLeetCode, getLeetCodeByName, updateLeetCode, deleteLeetCodeById }
