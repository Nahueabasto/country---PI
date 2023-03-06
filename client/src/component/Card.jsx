import React from "react";

export default function Card({id, image, name, continent}) {
    return(
        <div >
            <div>
            <img src={image} alt="boy hay" />
            </div>
            <h2>{name}</h2>
            <h5>Continent: {continent}</h5>
        </div>
    )
}


// export default function Card({id, image, name, continent}) {
//     return(
//         <div >
//             <div>
//             <img src={image} alt="boy hay" />
//             </div>
//             <h2>{name}</h2>
//             <h5>Continent: {continent}</h5>
//         </div>
//     )
// }
