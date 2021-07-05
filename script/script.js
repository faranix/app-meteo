// Les Imports
import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';

/**
 * Fetch API Méteo
 */
function meteoApi(longitude, latitude) {
    // Clé de API meteo 
    const keyApi = "9bbf65674ff366673eba7e033bb8cc1c";
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&lang=fr&appid=${keyApi}`, {
        method: "GET",
    })
    .then(res => {
        res.json().then(data => {
            changeHtml(data);
        });
    });
}

/**
 * Permet de changer les données en fonction des data reçu 
 */
function changeHtml(data) {
    console.log(data)

    const temps = document.querySelector('.temps');
    const temperature = document.querySelector('.temperature');
    const localisation = document.querySelector('.localisation');
    const futurHeure = document.querySelectorAll('.futur-heure');
    const futurTemperature = document.querySelectorAll('.futur-temperature');
    const futurPrevisionJour = document.querySelectorAll('.futur-prevision-jour');
    const futurPrevisionTemperature = document.querySelectorAll('.futur-prevision-temperature');
    const imageTemps = document.querySelector('.image-temps');


    // Obtenir l'heure actuelle 
    let heureActuelle = new Date().getHours();

    // Change les valeurs du temps actuelle
    temps.innerHTML = `${data.current.weather[0].description}`;
    temperature.innerHTML = `${Math.trunc(data.current.temp)}°C`;
    localisation.innerHTML = `${data.timezone}`;

    // Change les valeurs pour les heures futur
    for(let i = 0; i < futurHeure.length; i++) {
        let heureIncre = heureActuelle + i * 3;

        if (heureIncre > 24) {
            futurHeure[i].innerHTML = `${heureIncre - 24}h`;
        } else if (heureIncre == 24) {
            futurHeure[i].innerHTML = `00h`;
        } else {
            futurHeure[i].innerHTML = `${heureIncre}h`;
        }
    }

    // Change les valeurs pour les temperature dans les heures futur
    for(let j = 0; j < futurTemperature.length; j++) {
        futurTemperature[j].innerHTML = `${Math.trunc(data.hourly[j * 3].temp)}°C`;
    }

    // Changer les valeurs pour les futurs previsions de jours
    for(let v = 0; v < futurPrevisionJour.length; v++) {
        futurPrevisionJour[v].innerHTML = tabJoursEnOrdre[v + 1];
    }

    // Changer les valeurs pour les futurs previsions de temperature
    for(let k = 0; k < futurPrevisionTemperature.length; k++) {
        futurPrevisionTemperature[k].innerHTML = `${Math.trunc(data.daily[k + 1].temp.day)}°C`;
    }

    // Afficher une image en svg 
    if (heureActuelle >= 6 && heureActuelle < 21) {
        imageTemps.setAttribute('src', `./ressources/jour/${data.current.weather[0].icon}.svg`);
    } else {
        imageTemps.setAttribute('src', `./ressources/nuit/${data.current.weather[0].icon}.svg`);
    }
}



// Event Listener 
window.addEventListener('load', () => {

    // Cela va demander l'autorisation de localisation a l'utilisateur
    if ("geolocation" in navigator) {
        const geolocationUser = navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude; 
            const longitude = position.coords.longitude;
            
            if (latitude && longitude != undefined) {
                meteoApi(longitude, latitude);
            }
        });        
    } else {
        alert("Vous avez refuser la localisation !");
    }
});