const joursDeLaSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
let ajdr = new Date();
let options = {weekday: "long"};
let jourActuel = ajdr.toLocaleDateString("fr-FR", options);

// Cela va nous servir a trouver le jour de aujourd'hui dans le tableau
jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

// Crée un nouveau tableau avec les jours en ordre par rapport a ajdr 
let tabJoursEnOrdre = joursDeLaSemaine.slice(joursDeLaSemaine.indexOf(jourActuel)).concat(joursDeLaSemaine.slice(0, joursDeLaSemaine.indexOf(jourActuel)));

// On export le tableau en ordre par rapport a ajdr
export default tabJoursEnOrdre;