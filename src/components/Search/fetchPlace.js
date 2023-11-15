import axios from 'axios';

// Gets a list of cities which are similar to those which are in the <input>
export const fetchPlace = async (text) => {
  try {
    const res = await axios(
      `${process.env.REACT_APP_API_CITY_URL}/${text}.json?access_token=${process.env.REACT_APP_API_CITY_KEY}&cachebuster=1625641871908&autocomplete=true&types=place`,
    );
    return res;
  } catch (error) {
    alert('Unable to retrieve places');
    console.error(error);
  }
};
