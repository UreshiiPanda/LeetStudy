import 'dotenv/config';
import express from 'express';

// import the export obj from model.mjs and name it LeetCodeModels
import * as LeetCodeModels from './model.mjs';

// import the port number from the env file
const PORT = process.env.PORT;
const app = express();
app.use(express.json());


//  CREATE CONTROLLER     ######################################
// define a Create route
app.post('/create', (req, res) => {
    LeetCodeModels.createLeetCodeDoc(
        req.body.patternKey,
        req.body.patternName,
        req.body.patternInfo, 
        req.body.patternMoreInfo,
        req.body.patternSources
        )
        .then(newLeetCode => {
            res.status(201).json(newLeetCode);
            console.log("CREATE:   A new LeetCode document was successfully created.");
        })
        .catch(error => {
            console.error(error);
            res.status(400).json( { Error: "The new LeetCode document creation failed due to invalid user input."} );
        });
});


//  RETRIEVE CONTROLLERS     ######################################
// define a Retrieve route
app.get('/get', (req, res) => { 
    LeetCodeModels.getLeetCode()
        .then(retrievedLeetCode => {
            if (retrievedLeetCode !== null) {    
                res.json(retrievedLeetCode);
                console.log("Retrieved from LeetCode DB: ", retrievedLeetCode);
                console.log("RETRIEVE:  ALL existing LeetCode documents were successfully retrieved.");
            } else {
                res.status(404).json( { Error: "The LeetCode document was not found."} );
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json( {Error: "The LeetCode document retrieval failed due to invalid user input."} );
        });
});


// define a Retrieve by Key route
app.get('/get/:patternKey', (req, res) => {
    LeetCodeModels.getLeetCodeByName(req.params.patternKey)
    .then(retrievedLeetCode => {
            if (retrievedLeetCode !== null) {    
                res.json(retrievedLeetCode);
                console.log("Retrieved from LeetCode DB: ", retrievedLeetCode);
                console.log("RETRIEVE:  An existing LeetCode document was successfully retrieved by Name.");
            } else {
                res.status(404).json( { Error: `The patternName ${req.params.patternKey} was not found.`} );
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json( {Error: "The LeetCode document retrieval failed due to invalid user input."} );
        });
});


//  UPDATE CONTROLLER     ######################################
// define an Update route by ID
app.put('/update/:_id', (req, res) => {
    LeetCodeModels.updateLeetCode(
        req.params._id,
        req.body.patternKey,
        req.body.patternName,
        req.body.patternInfo, 
        req.body.patternMoreInfo,
        req.body.patternSources
        )
        .then(updateLeetCode => {
            res.json(updateLeetCode);
            console.log("UPDATE:  An existing LeetCode document was successfully updated.");
        })
        .catch(error => {
            console.error(error);
            res.status(400).json( {Error: "The LeetCode document update failed due to invalid user input."} );
        });
});


//  DELETE CONTROLLER     ######################################
// define a Delete route
app.delete('/delete/:_id', (req, res) => {
    LeetCodeModels.deleteLeetCodeById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
                console.log("DELETE:  An existing LeetCode document was successfully deleted.");
            } else {
                res.status(404).json( {Error: "The LeetCode document was not found."});
            }
        })
        .catch(error => {
            console.error(error);
            res.send( {Error: "The LeetCode document deletion by ID failed."});
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
