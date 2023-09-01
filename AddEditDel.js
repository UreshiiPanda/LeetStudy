import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import { RiEditCircleFill } from 'react-icons/ri';
import { MdCancel } from 'react-icons/md';


function AddEditDel( {topicNum, setTopicNum, retrieveAllLeetCode, addIsOpen, setAddIsOpen, editIsOpen, setEditIsOpen, leetCodeEntry, setLeetCodeEntry} ) {


    const onAddLeetCode = async () => {
        setAddIsOpen(true);
        console.log("ADD IS OPEN: ", {addIsOpen});
    }

    const onEditLeetCode = async () => {
        setLeetCodeEntry(leetCodeEntry);
        setEditIsOpen(true);
        console.log("EDIT IS OPEN: ", {editIsOpen});
    }

    const onDeleteLeetCode = async () => {
        const response = await fetch(`/delete/${leetCodeEntry._id}`, { method: 'DELETE' });
        if (response.status === 204) {
            retrieveAllLeetCode();
            setTopicNum(1);
            console.log("Successfully deleted a LeetCode entry from the DB");
            alert(`A LeetCode entry has been successfully deleted from the DB`);
        }
        else {
            console.error("Failed to delete the LeetCode entry from the DB");
            alert("Failed to delete the LeetCode entry from the DB");
        }
    } 
    
    return (
        <>
            <div className="add-edit-del">
                <MdAddCircle onClick={() => onAddLeetCode()} className='add' />
                <RiEditCircleFill onClick={() => onEditLeetCode() } className='edit' />
                <MdCancel onClick={() => onDeleteLeetCode()} className='del' />
            </div>
        </>
    )

}

export default AddEditDel;
