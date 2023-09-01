import React from "react"

function LeetCodeSources( {topicNum, prevActionArr, handleTextSection, leetCodeEntry} ) {


    const leetCodePatternSources = leetCodeEntry.patternSources;

    return(
        <>
        <div key={prevActionArr.length} className="leet-main-page">

            <div className="text-section text-div">
                <h2>LeetCode problems for pattern {topicNum}: {leetCodeEntry.patternName} </h2>
                <ul className="align-left">
                    {leetCodePatternSources.map((source) => (
                        <li>{source}</li>
                    ))}
                </ul>
            </div>
        
            <div className="buttons-div">
                <div className="single-button">
                    <button className="inner-buttons" onClick={ () => handleTextSection("pattern")}>Main Info</button>
                </div>
                <div className="single-button">
                    <button className="inner-buttons" onClick={ () => handleTextSection("more")}>Steps</button>
                </div>
            </div>

        </div>
        </>
    );
}


export default LeetCodeSources;