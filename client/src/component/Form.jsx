import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivities, getCountries, getActivities } from "../Redux/Actions";
import { useDispatch, useSelector } from 'react-redux';


function validate(input) {
    let errors = {};
  
    // Validación del campo "name"
    if (!input.name) {
      errors.name = "Se requiere un name";
    }
  
    // Validación del campo "difficulty"
    if (!input.difficulty) {
      errors.difficulty = "Se requiere una dificultad";
    } else if (isNaN(input.difficulty) || input.difficulty < 1 || input.difficulty > 5) {
      errors.difficulty = "La dificultad debe ser un número entre 1 y 5";
    }
  
    // Validación del campo "duration"
    if (!input.duration) {
      errors.duration = "Se requiere una duración";
    }
  
    // Validación del campo "season"
    if (!input.season) {
      errors.season = "Se requiere una temporada";
    } else if (!["Summer", "Fall", "Winter", "Spring"].includes(input.season)) {
      errors.season = "La temporada debe ser 'Summer', 'Fall', 'Winter' o 'Spring'";
    }
  
    return errors;
  }

export default function Form(){

    const dispatch = useDispatch();
    const history = useHistory();
    const allCountries = useSelector((state) => state.countries);
    
    const [selectedCountries, setSelectedCountries] = useState([]);

    const [errors, setErrors] = useState({ });


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
        setInput({ ...input, [e.target.name]: e.target.value });
        setErrors(
            validate({
            ...input,
            [e.target.name] : e.target.value
        })
        )
    }
 
    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postActivities(input));
        alert("Actividad creada!");
        setInput({ 
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countries: []
        })
        history.push('/home'); 
    
    }

    //Luuu! a partir de aca es lo que modifique ultimo, mas el estado local que agregue arriba!! :D
    // Y obviamente los cambios que hice en el return a partir de la linea 146
    const handleSelect = (e) => {
      const value = e.target.value;
      if (!selectedCountries.includes(value)) {
        setSelectedCountries([...selectedCountries, value]);
      }
    };

    const handleDelete = (name) => {
      setSelectedCountries(selectedCountries.filter((el) => el !== name));
    };

    const filteredCountries = allCountries.filter((el) =>
    selectedCountries.includes(el.name)
  );
    
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
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label>difficulty:</label>
                    <input type="number" value={input.difficulty} name='difficulty' 
                    onChange={e => handleChange(e)}>
                    </input>
                    {errors.difficulty && <p>{errors.difficulty}</p>}
                </div>
                <div>
                    <label>duration:</label>
                    <input type='number' value={input.duration} name='duration'
                     onChange={e => handleChange(e)}>  
                    </input>
                    {input.duration && <span> horas</span>}
                    {errors.duration && <p>{errors.duration}</p>}
                </div>
                <div>
            <label>season:</label>
               <select value={input.season} name='season' onChange={e => handleChange(e)}>
                 <option value="Summer">Summer</option>
                   <option value="Fall">Fall</option>
                   <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
              </select>
              {errors.season && <p>{errors.season}</p>}
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
                <div >
              {filteredCountries?.map((el) => (
                <div key={el.id}>
                  {el.name}{" "}
                  <button onClick={() => handleDelete(el.name)}>x</button>
                </div>
                 ))}
                 </div>

                <button type='submit'>Crear Actvidad</button>
            </form>
        </div>
    )
}