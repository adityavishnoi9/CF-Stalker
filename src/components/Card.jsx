import React, { useState } from "react";

function Card({que , rating, isInOtherList}){
    console.log(typeof(rating));
    const r = parseInt(rating, 10); 
    function clickHandler(){
        const url = `https://codeforces.com/contest/${que.problem.contestId}/problem/${que.problem.index}`
        console.log(url);
        window.open(url, '_blank');
    }
    const [cnt , setCnt] = useState(0)
    return (
        isInOtherList === false ? (
          <div
            className="w-11/12 border-2 mt-2 mb-2 text-center mx-12 py-1 bg-blue-100 text-black cursor-pointer transition-transform transform-gpu hover:scale-105 hover:bg-blue-600 hover:shadow-lg"
            onClick={clickHandler}
          >
            {/* <p>hello</p> */}
            {que.problem.name}
          </div>
        ) : (
          <div
            className="w-11/12 border-2 mt-2 mb-2 text-center mx-12 py-1 bg-green-100 text-black cursor-pointer transition-transform transform-gpu hover:scale-105 hover:bg-green-600 hover:shadow-lg"
            onClick={clickHandler}
          >
            {/* <p>hi</p> */}
            {que.problem.name}
          </div>
        )
      );
      
}
export default Card;