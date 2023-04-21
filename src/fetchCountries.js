

export default function fetchCountries(name) {
    const URL_BASE = 'https://restcountries.com/v3.1/name/';
const FIELDS = 'name,capital,population,flags,languages'; 
   
    return fetch('${URL_BASE}${name}?fields=${FIELDS}')
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
        
    });
    
}
