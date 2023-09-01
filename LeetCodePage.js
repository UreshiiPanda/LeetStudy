import { React, useState } from "react"
import LeetCodeMore from "../components/LeetCodeMore";
import LeetCodePattern from "../components/LeetCodePattern";
import LeetCodeSources from "../components/LeetCodeSources";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function LeetCodePage( {retrieveAllLeetCode, addIsOpen, setAddIsOpen, editIsOpen, setEditIsOpen, topicNum, setTopicNum, textSection, setTextSection, prevActionArr, setPrevActionArr, leetCodeEntry, setLeetCodeEntry} ) {

    const handleTextSection = (textSectionValue) => {
        setPrevActionArr(oldArr => [...oldArr, {
            page: "leetcode",
            topicNum: topicNum,
            textSection: textSection,
            leetCodeEntry: leetCodeEntry
        }]);
        setTextSection(textSectionValue);
        console.log("Previous actions: ", prevActionArr);
    }

    const [newPatternKey, setNewPatternKey]               = useState('newPatternKey');
    const [newPatternName, setNewPatternName]             = useState('newPatternName');
    const [newPatternInfo, setNewPatternInfo]             = useState('newPatternInfo');
    const [newPatternSteps, setNewPatternSteps]           = useState('newPatternSteps');
    const [newPatternProblems, setNewPatternProblems]     = useState('newPatternProblems');

    const [editPatternKey, setEditPatternKey]               = useState(leetCodeEntry.patternKey);
    const [editPatternName, setEditPatternName]             = useState(leetCodeEntry.patternName);
    const [editPatternInfo, setEditPatternInfo]             = useState(leetCodeEntry.patternInfo);
    const [editPatternSteps, setEditPatternSteps]           = useState(leetCodeEntry.patternMoreInfo);
    const [editPatternProblems, setEditPatternProblems]     = useState(leetCodeEntry.patternSources);


    const addLeetCode = async () => {
        const patternInfoArr = newPatternInfo.split('&');         // parse the user string into an array via & delimiter
        const patternStepsArr = newPatternSteps.split('&');
        const patternProblemsArr = newPatternProblems.split('&');
        const newLeetCode = { 
            patternKey: newPatternKey,
            patternName: newPatternName,
            patternInfo: patternInfoArr,
            patternMoreInfo: patternStepsArr,
            patternSources: patternProblemsArr
        };
        const response = await fetch('/create', {
            method: 'POST',
            body: JSON.stringify(newLeetCode),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`A new LeetCode entry has been successfully added to the DB`);
            retrieveAllLeetCode();
            setTopicNum(1);
        } else {
            alert(`A new LeetCode entry has failed to add to the DB`);
        }

    }

    const editLeetCode = async () => {
        let editPatternInfoArr = leetCodeEntry.patternInfo;         // check if user has changed the values or not
        let editPatternStepsArr = leetCodeEntry.patternMoreInfo;    // if user didn't update a value, then just set it 
        let editPatternProblemsArr = leetCodeEntry.patternSources;  // back to its default value, which is the old value
        let editPatternKeyCheck = leetCodeEntry.patternKey;
        let editPatternNameCheck = leetCodeEntry.patternName;

        console.log(editPatternInfo);
        console.log(leetCodeEntry.patternInfo);

        if (editPatternInfo.toString() !== leetCodeEntry.patternInfo.toString()) {
            if (editPatternInfo === undefined || editPatternInfo === '') {
                editPatternInfoArr = leetCodeEntry.patternInfo;
            } else {
                editPatternInfoArr = editPatternInfo.split('&');
            }
            
        }
        if (editPatternSteps.toString() !== leetCodeEntry.patternMoreInfo.toString()) {
            if (editPatternSteps === undefined || editPatternSteps === '') {
                editPatternStepsArr = leetCodeEntry.patternMoreInfo;
            } else {
                editPatternStepsArr = editPatternSteps.split('&');
            }
        }
        if (editPatternProblems.toString() !== leetCodeEntry.patternSources.toString()) {
            if (editPatternProblems === '' || editPatternProblems === undefined) {
                editPatternProblemsArr = leetCodeEntry.patternSources;
            } else {
                editPatternProblemsArr = editPatternProblems.split('&');
            }
        }
        if (editPatternKey !== leetCodeEntry.patternKey) {
            editPatternKeyCheck = editPatternKey;
        }
        if (editPatternName !== leetCodeEntry.patternName) {
            editPatternNameCheck = editPatternName;
        }

        const response = await fetch(`/update/${leetCodeEntry._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                patternKey: editPatternKeyCheck,
                patternName: editPatternNameCheck,
                patternInfo: editPatternInfoArr,
                patternMoreInfo: editPatternStepsArr,
                patternSources: editPatternProblemsArr
            }),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.status === 200) {
            alert(`A new LeetCode entry has been successfully updated in the DB`);
            retrieveAllLeetCode();
            setTopicNum(1);
        } else {
            const errMessage = await response.json();
            alert(`A new LeetCode entry has failed to update in the DB, with err msg: ${errMessage.Error}`);
        }
    }


    switch(textSection) {
        case("more"):
            return(
                <>
                    <div>
                        <Dialog open={addIsOpen} onClose={() => setAddIsOpen(false)}>
                            <DialogTitle>Add LeetCode</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Separate array indices with an & symbol
                            </DialogContentText>
                                <label htmlFor="patternKey">Key</label>
                                <TextField
                                    type="text"
                                    name="key"
                                    placeholder="Pattern Key"
                                    onChange={e => setNewPatternKey(e.target.value)} 
                                    id="patternKey"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />
                                
                                <label htmlFor="patternName">Name</label>
                                <TextField
                                    type="text"
                                    name="name"
                                    placeholder="Pattern Name"
                                    onChange={e => setNewPatternName(e.target.value)} 
                                    id="patternName"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternInfo">Main Info</label>
                                <TextField
                                    type="text"
                                    name="info[]"
                                    placeholder="Pattern Main Info"
                                    onChange={e => setNewPatternInfo(e.target.value)}
                                    id="patternInfo"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternSteps">Steps</label>
                                <TextField
                                    type="text"
                                    name="steps[]"
                                    placeholder="Pattern Steps"
                                    onChange={e => setNewPatternSteps(e.target.value)} 
                                    id="patternSteps"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternProblems">Problems</label>
                                <TextField
                                    type="text"
                                    name="problems[]"
                                    placeholder="Pattern LC Problems"
                                    onChange={e => setNewPatternProblems(e.target.value)}
                                    id="patternProblems"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={ () => {addLeetCode(); setAddIsOpen(false)} }>Add</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div>
                        <Dialog open={editIsOpen} onClose={() => setEditIsOpen(false)}>
                            <DialogTitle>Edit LeetCode</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Separate array indices with an & symbol
                            </DialogContentText>
                                <label htmlFor="patternKey">Key</label>
                                <TextField
                                    type="text"
                                    name="key"
                                    placeholder={leetCodeEntry.patternKey}
                                    onChange={e => setEditPatternKey(e.target.value)} 
                                    id="patternKey"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />
                                
                                <label htmlFor="patternName">Name</label>
                                <TextField
                                    type="text"
                                    name="name"
                                    placeholder={leetCodeEntry.patternName}
                                    onChange={e => setEditPatternName(e.target.value)} 
                                    id="patternName"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternInfo">Main Info</label>
                                <TextField
                                    type="text"
                                    name="info[]"
                                    placeholder={leetCodeEntry.patternInfo}
                                    onChange={e => setEditPatternInfo(e.target.value)}
                                    id="patternInfo"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternSteps">Steps</label>
                                <TextField
                                    type="text"
                                    name="steps[]"
                                    placeholder={leetCodeEntry.patternMoreInfo}
                                    onChange={e => setEditPatternSteps(e.target.value)} 
                                    id="patternSteps"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternProblems">Problems</label>
                                <TextField
                                    type="text"
                                    name="problems[]"
                                    placeholder={leetCodeEntry.patternSources}
                                    onChange={e => setEditPatternProblems(e.target.value)}
                                    id="patternProblems"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={ () => {editLeetCode(); setEditIsOpen(false)} }>Edit</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <LeetCodeMore 
                        topicNum={topicNum} 
                        prevActionArr={prevActionArr} 
                        handleTextSection={handleTextSection}
                        leetCodeEntry={leetCodeEntry}
                    />
                </>
            );
        case("sources"):
            return(
                <>
                    <div>
                        <Dialog open={addIsOpen} onClose={() => setAddIsOpen(false)}>
                            <DialogTitle>Add LeetCode</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Separate array indices with an & symbol
                            </DialogContentText>
                                <label htmlFor="patternKey">Key</label>
                                <TextField
                                    type="text"
                                    name="key"
                                    placeholder="Pattern Key"
                                    onChange={e => setNewPatternKey(e.target.value)} 
                                    id="patternKey"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />
                                
                                <label htmlFor="patternName">Name</label>
                                <TextField
                                    type="text"
                                    name="name"
                                    placeholder="Pattern Name"
                                    onChange={e => setNewPatternName(e.target.value)} 
                                    id="patternName"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternInfo">Main Info</label>
                                <TextField
                                    type="text"
                                    name="info[]"
                                    placeholder="Pattern Main Info"
                                    onChange={e => setNewPatternInfo(e.target.value)}
                                    id="patternInfo"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternSteps">Steps</label>
                                <TextField
                                    type="text"
                                    name="steps[]"
                                    placeholder="Pattern Steps"
                                    onChange={e => setNewPatternSteps(e.target.value)} 
                                    id="patternSteps"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternProblems">Problems</label>
                                <TextField
                                    type="text"
                                    name="problems[]"
                                    placeholder="Pattern LC Problems"
                                    onChange={e => setNewPatternProblems(e.target.value)}
                                    id="patternProblems"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={ () => {addLeetCode(); setAddIsOpen(false)} }>Add</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div>
                        <Dialog open={editIsOpen} onClose={() => setEditIsOpen(false)}>
                            <DialogTitle>Edit LeetCode</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Separate array indices with an & symbol
                            </DialogContentText>
                                <label htmlFor="patternKey">Key</label>
                                <TextField
                                    type="text"
                                    name="key"
                                    placeholder={leetCodeEntry.patternKey}
                                    onChange={e => setEditPatternKey(e.target.value)} 
                                    id="patternKey"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />
                                
                                <label htmlFor="patternName">Name</label>
                                <TextField
                                    type="text"
                                    name="name"
                                    placeholder={leetCodeEntry.patternName}
                                    onChange={e => setEditPatternName(e.target.value)} 
                                    id="patternName"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternInfo">Main Info</label>
                                <TextField
                                    type="text"
                                    name="info[]"
                                    placeholder={leetCodeEntry.patternInfo}
                                    onChange={e => setEditPatternInfo(e.target.value)}
                                    id="patternInfo"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternSteps">Steps</label>
                                <TextField
                                    type="text"
                                    name="steps[]"
                                    placeholder={leetCodeEntry.patternMoreInfo}
                                    onChange={e => setEditPatternSteps(e.target.value)} 
                                    id="patternSteps"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternProblems">Problems</label>
                                <TextField
                                    type="text"
                                    name="problems[]"
                                    placeholder={leetCodeEntry.patternSources}
                                    onChange={e => setEditPatternProblems(e.target.value)}
                                    id="patternProblems"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={ () => {editLeetCode(); setEditIsOpen(false)} }>Edit</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <LeetCodeSources 
                        topicNum={topicNum} 
                        prevActionArr={prevActionArr} 
                        handleTextSection={handleTextSection}
                        leetCodeEntry={leetCodeEntry}
                    />
                </>
            );
        default:                                 // default to option "pattern" for Pattern "main info" page
            return(
                <>
                    <div>
                        <Dialog open={addIsOpen} onClose={() => setAddIsOpen(false)}>
                            <DialogTitle>Add LeetCode</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Separate array indices with an & symbol
                            </DialogContentText>
                                <label htmlFor="patternKey">Key</label>
                                <TextField
                                    type="text"
                                    name="key"
                                    placeholder="Pattern Key"
                                    onChange={e => setNewPatternKey(e.target.value)} 
                                    id="patternKey"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />
                                
                                <label htmlFor="patternName">Name</label>
                                <TextField
                                    type="text"
                                    name="name"
                                    placeholder="Pattern Name"
                                    onChange={e => setNewPatternName(e.target.value)} 
                                    id="patternName"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternInfo">Main Info</label>
                                <TextField
                                    type="text"
                                    name="info[]"
                                    placeholder="Pattern Main Info"
                                    onChange={e => setNewPatternInfo(e.target.value)}
                                    id="patternInfo"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternSteps">Steps</label>
                                <TextField
                                    type="text"
                                    name="steps[]"
                                    placeholder="Pattern Steps"
                                    onChange={e => setNewPatternSteps(e.target.value)} 
                                    id="patternSteps"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternProblems">Problems</label>
                                <TextField
                                    type="text"
                                    name="problems[]"
                                    placeholder="Pattern LC Problems"
                                    onChange={e => setNewPatternProblems(e.target.value)}
                                    id="patternProblems"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={ () => {addLeetCode(); setAddIsOpen(false)} }>Add</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <div>
                        <Dialog open={editIsOpen} onClose={() => setEditIsOpen(false)}>
                            <DialogTitle>Edit LeetCode</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Separate array indices with an & symbol
                            </DialogContentText>
                                <label htmlFor="patternKey">Key</label>
                                <TextField
                                    type="text"
                                    name="key"
                                    placeholder={leetCodeEntry.patternKey}
                                    onChange={e => setEditPatternKey(e.target.value)} 
                                    id="patternKey"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />
                                
                                <label htmlFor="patternName">Name</label>
                                <TextField
                                    type="text"
                                    name="name"
                                    placeholder={leetCodeEntry.patternName}
                                    onChange={e => setEditPatternName(e.target.value)} 
                                    id="patternName"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternInfo">Main Info</label>
                                <TextField
                                    type="text"
                                    name="info[]"
                                    placeholder={leetCodeEntry.patternInfo}
                                    onChange={e => setEditPatternInfo(e.target.value)}
                                    id="patternInfo"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternSteps">Steps</label>
                                <TextField
                                    type="text"
                                    name="steps[]"
                                    placeholder={leetCodeEntry.patternMoreInfo}
                                    onChange={e => setEditPatternSteps(e.target.value)} 
                                    id="patternSteps"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />

                                <label htmlFor="patternProblems">Problems</label>
                                <TextField
                                    type="text"
                                    name="problems[]"
                                    placeholder={leetCodeEntry.patternSources}
                                    onChange={e => setEditPatternProblems(e.target.value)}
                                    id="patternProblems"
                                    className="user-input"
                                    fullWidth
                                    variant="standard"
                                    autoFocus
                                    margin="dense"
                                />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={ () => {editLeetCode(); setEditIsOpen(false)} }>Edit</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                    <LeetCodePattern 
                        topicNum={topicNum} 
                        prevActionArr={prevActionArr} 
                        handleTextSection={handleTextSection}
                        leetCodeEntry={leetCodeEntry}
                    />
                </>
            );
    }
}

export default LeetCodePage;

    
