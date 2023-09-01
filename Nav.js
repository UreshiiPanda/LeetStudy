import React from "react";

function Nav( {setInfo} ) {

    const handleInfo = (infoValue) => {
        setInfo(infoValue);
    }

    return(
        <> 
            <section> 
                <button onClick={() => handleInfo("home")}>Home</button>
                <button onClick={() => handleInfo("contact")}>Contact</button>
                <button onClick={() => handleInfo("leetcode")}>LeetCode</button>
            </section>
        </>
    );
}

export default Nav;