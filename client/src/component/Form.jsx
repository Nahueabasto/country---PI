import React from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivities, getCountries } from "../Redux/Actions";
import { useDispatch, useSelector } from 'react-redux';


export default function Form(){

    const dispatch = useDispatch();
    const history = useHistory();
    const allCountries = useSelector((state) => state.countries);

    const [input, setInput] = useState({
        name: '', 
        difficulty: '', 
        duration: '', 
        season: '', 
        country: []
    });



    return(
        <div>
            <form action="">
                
            </form>
        </div>
    )
}