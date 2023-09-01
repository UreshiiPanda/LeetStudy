import React from "react"

function LeetCodePattern( {topicNum, handleTextSection, leetCodeEntry} ) {


    const leetCodePatternList = leetCodeEntry.patternInfo;

    return(
        <>
        <div className="leet-main-page">

            <div className="text-section text-div">
                <h2>LeetCode Pattern {topicNum}: {leetCodeEntry.patternName} </h2>
                <ul className="align-left">
                    {leetCodePatternList.map((info) => (
                        <li>{info}</li>
                    ))}
                </ul>
            </div>

            <div className="buttons-div">
                <div className="single-button">
                    <button className="inner-buttons" onClick={ () => handleTextSection("more")}>Steps</button>
                </div>
                <div className="single-button">
                    <button className="inner-buttons" onClick={ () => handleTextSection("sources")}>LC Problems</button>
                </div>
            </div>

        </div>
        </>
    );
}


export default LeetCodePattern;