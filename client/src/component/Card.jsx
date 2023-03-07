import React from "react";
import { Link } from "react-router-dom";

export default function Card({id, image, name, continent}) {
    return(
        <div >
            <Link to={`/countries/${id}`}>
            <div>
            <img src={image} alt="boy hay" />
            </div>
            <h2>{name}</h2>
            <h5>Continent: {continent}</h5>
            </Link>
        </div>
    )
}
