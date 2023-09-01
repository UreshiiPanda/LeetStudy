import React, { useEffect } from "react";


function LeetCodeMenu( {retrieveAllLeetCode, allLeetCode, setAllLeetCode, topicNum, setTopicNum, prevActionArr, setPrevActionArr, textSection, leetCodeEntry, setLeetCodeEntry, isFirstRender, setIsFirstRender} ) {

    
    const handleTopicNum = (num) => {
        setPrevActionArr(oldArr => [...oldArr, {            // PUSH a new prev state Obj to end of the prevActionArr
            page: "leetcode",
            topicNum: topicNum,
            textSection: textSection,
            leetCodeEntry: leetCodeEntry
        }]);
        setTopicNum(num);
        console.log("Previous actions: ", prevActionArr);
    }

    // LOAD the LeetCode entry 
    useEffect(() => {
        retrieveAllLeetCode();
    }, []);      

    return (

	 <section className="leetcode-menu">
   	     <h2 className="patterns-menu-title">LeetCode Patterns</h2>     
   	     <article className="inner-menu">
   	         {allLeetCode.map( (leetCode, index) => 
   	             <button onClick={() => {handleTopicNum(index + 1); setLeetCodeEntry(leetCode);}}>Pattern {index+1}:  {leetCode.patternKey}</button>
   	         )}
   	     </article>
   	 </section>

    );
}

export default LeetCodeMenu;
