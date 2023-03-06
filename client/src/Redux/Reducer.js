import { GET_COUNTRIES, GET_NAME_COUNTRY, FILTER_CONTINENT, FILTER_ACTIVIDADES, GET_ACTIVITIES } from "./Actions";

const initialState = {
  countries: [],
  filtered: [],
  filteredCountries: [],
  activities: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        filtered: action.payload,
      }

      case GET_ACTIVITIES:
        return{
          ...state,
          activities: action.payload,
        }

    case GET_NAME_COUNTRY:
      return {
        ...state,
        countries: action.payload,
      }


    case FILTER_CONTINENT:
      const allContinent = state.filtered;
      const continentFilter = action.payload === "All" ? allContinent : allContinent.filter(el => el.continent === action.payload)
      return{
        ...state,
        countries: continentFilter
      }

      case FILTER_ACTIVIDADES:
  const allCountries = state.filtered;
  const activityFilter = action.payload === "All" ? allCountries : allCountries.filter(country => {
    return country.activities.some(activity => activity.name.toLowerCase() === action.payload.toLowerCase());
  });
  return {
    ...state,
    countries: activityFilter
  };

    
        
    default:
      return state;
  }
}

export default reducer;
