import icons from './iconsList.json';

// Sets prefixes for weather icons depending on the data which are recieved from
// "OpenWeather" API
const Icons = (iconId = 200) => {
  const prefix = 'wi wi-';
  let icon = icons[iconId] ? icons[iconId].icon : 'storm';

  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(iconId > 699 && iconId < 800) && !(iconId > 899 && iconId < 1000)) {
    icon = 'day-' + icon;
  }

  return prefix + icon;
};

export default Icons;
