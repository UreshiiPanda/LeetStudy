import React from "react"

function LeetCodeMore( {topicNum, prevActionArr, handleTextSection, leetCodeEntry} ) {

    const leetCodeSteps = leetCodeEntry.patternMoreInfo; 

    return(
        <>
        <div className="leet-main-page">

            <div className="text-section text-div">
                <h2>Steps of LeetCode pattern {topicNum}:  {leetCodeEntry.patternName} </h2>
                <ul className="align-left">
                    {leetCodeSteps.map((step) => (
                        <li>{step}</li>
                    ))}
                </ul>
            </div>

            <div className="buttons-div">
                <div className="single-button">
                    <button className="inner-buttons" onClick={ () => handleTextSection("pattern")}>Main Info</button>
                </div>
                <div className="single-button">
                    <button className="inner-buttons" onClick={ () => handleTextSection("sources")}>LC Problems</button>
                </div>
            </div>
            
        </div>
        </>
    );
}


export default LeetCodeMore;