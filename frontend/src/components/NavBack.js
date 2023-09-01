import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBack( {setInfo, prevActionArr, setPrevActionArr, setTopicNum, setTextSection, leetCodeEntry, setLeetCodeEntry} ) {

    const redirect = useNavigate();

    const handleInfo = (infoValue) => {
        setInfo(infoValue);
    }

    const handlePrevAction = () => {
        const copyPrevActionArr = [...prevActionArr];   // we don't want to change the State w/o using useState, so make copy
        const prevState = copyPrevActionArr.pop();      // grab whatever the last State was and store it
        setPrevActionArr(copyPrevActionArr);            // and NOW we can set the arr to the copy w/ useState
 
        if (prevState.page === "/") {
            handleInfo("leetcode");
            console.log(redirect);
            redirect("/");
            redirect(0);                                // a work-around solution to a curr React useNavigate() problem
        } else {
            setTopicNum(prevState.topicNum);
            setTextSection(prevState.textSection);
            setLeetCodeEntry(prevState.leetCodeEntry)
        }
        console.log("Previous actions: ", prevActionArr);
    }


    return(
        <> 
            <nav className="nav-back"> 
                <Link onClick={() => handlePrevAction()}>Back</Link>
                <Link to="/" onClick={() => handleInfo("home")}>Home</Link>
                <Link to="/" onClick={() => handleInfo("contact")}>Contact</Link>
            </nav>
        </>
    );
}

export default NavBack;
