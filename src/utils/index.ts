import moment from 'moment/moment';

export const handleAPIError = (error: any, displayError = false) => {
  if (process.env.NODE_ENV !== "production") {
   console.error(error);
  }

  if (error &&Object.getOwnPropertyNames(error).includes("response"))   {
    const message = error?.response?.data?.message;

    if (displayError) {
      console.log("message", message)
    }

    return message
  }
};

export const waitFor = (duration: number) => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, duration)
  })
}
 
export const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(posData => {
      resolve(posData);
    }, error => {
      reject(error);
    })
  })
}

export const validateEmail = {
  value: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  message: 'Please enter a valid email address'
}

export const validatePassword = {
  value: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{10,}$/),
  message: 'Password must be at least 10 characters long and include uppercase and lowercase letters, and numbers'
}

export const lArray = (object: object) => Object.values(Object.assign(object));

export const nameAcronim = (name: string) => {
  const matches = name.match(/\b(\w)/g);
  if (!matches) return;

  return matches.join('');
}

export const formatDate = (date: Date | string, format: string) => {
  format = format || 'MMMM Do YYYY, h:mm:ss a';
  if (date) return moment(date).format(format);
  return moment().format(format);
}

export function haversineDistance(coord1: {lat: number; lon: number}, coord2: {lat: number; lon: number}) {
  // Radius of the Earth in kilometers
  const R = 6371;
  // Conversion factor from kilometers to miles
  const KM_TO_MILES = 0.621371;

  // Convert degrees to radians
  const lat1 = Number(coord1.lat) * Math.PI / 180;
  const lon1 = Number(coord1.lon) * Math.PI / 180;
  const lat2 = Number(coord2.lat) * Math.PI / 180;
  const lon2 = Number(coord2.lon) * Math.PI / 180;

  // Haversine formula
  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dlon / 2) * Math.sin(dlon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distanceKm = R * c;

  // Convert distance to miles
  const distanceMiles = distanceKm * KM_TO_MILES;

  return distanceMiles.toFixed(2);
}