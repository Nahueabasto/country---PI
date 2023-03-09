import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivities, getCountries, getActivities } from "../Redux/Actions";
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
        countries: []
    });

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities())
      }, [dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            countries: [
                ...input.countries,
                e.target.value
            ]
        });
    };
    // function handleSelect(e) {
    //     const countryId = e.target.value;
    //     setInput({
    //       ...input,
    //       country: [...input.country, countryId]
    //     });
    //   }
      

    
    function handleSubmit(e){
        e.preventDefault();
        dispatch(postActivities(input))
        alert("Activity create!")
        setInput({
            name: '', 
            difficulty: '', 
            duration: '', 
            season: '', 
            countries: []
        });
        history.push('/home')
    };
    // function handleSubmit(e) {
    //     e.preventDefault();
    //     const activityData = {
    //       name: input.name,
    //       difficulty: input.difficulty,
    //       duration: input.duration,
    //       season: input.season,
    //       countryId: input.country[0]
    //     };
    //     dispatch(postActivities(activityData));
    //     alert("Activity created!");
    //     setInput({
    //       name: "",
    //       difficulty: "",
    //       duration: "",
    //       season: "",
    //       country: []
    //     });
    //     history.push("/home");
    //   }
      


    return(
        <div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            <h1>Crear Actividad Turistica</h1>
            <form onSubmit={e => {handleSubmit(e)}}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={input.name} name='name' 
                    onChange={e => handleChange(e)}>
                    </input>
                </div>
                <div>
                    <label>difficulty:</label>
                    <input type="number" value={input.difficulty} name='difficulty' 
                    onChange={e => handleChange(e)}>
                    </input>
                </div>
                <div>
                    <label>duration:</label>
                    <input type='number' value={input.duration} name='duration'
                     onChange={e => handleChange(e)}>  
                    </input>
                </div>
                <div>
            <label>season:</label>
               <select value={input.season} name='season' onChange={e => handleChange(e)}>
                 <option value="Summer">Summer</option>
                   <option value="Fall">Fall</option>
                   <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
              </select>
                </div>

                <div>
                    <label>country:</label>
                    <select name='countries' onChange={e => handleSelect(e)}>
                        {allCountries.map(el => (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        ))
                        }

                    </select>
                </div>
                <button type='submit'>Crear Actvidad</button>
            </form>
        </div>
    )
}