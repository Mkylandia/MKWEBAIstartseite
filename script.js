/* --- UHR & DATUM --- */
function updateClock() {
    const now = new Date();
    
    // Uhrzeit
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Sekunden optional
    document.getElementById('clock').textContent = `${hours}:${minutes}`; // Ohne Sekunden für cleaneres Design, oder :${seconds} anfügen

    // Datum
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('de-DE', options);
}
setInterval(updateClock, 1000);
updateClock();

/* --- GOOGLE SUCHE --- */
function handleSearch(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-input').value;
        if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }
}

/* --- THEME SWITCHER --- */
// Liste der verfügbaren Themes (Klassen im CSS)
const themes = ['', 'theme-blue', 'theme-green', 'theme-orange']; // '' ist Standard (Lila)
let currentThemeIndex = 0;

// Theme beim Laden wiederherstellen
const savedTheme = localStorage.getItem('siteTheme');
if (savedTheme) {
    document.body.className = savedTheme;
    currentThemeIndex = themes.indexOf(savedTheme);
}

function changeTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    
    document.body.className = newTheme;
    
    // Speichern im LocalStorage
    localStorage.setItem('siteTheme', newTheme);
}

/* --- WETTER (Open-Meteo API - Kostenlos & Kein Key nötig) --- */
// HINWEIS: Um dein Wetter zu bekommen, ändere latitude (Breitengrad) und longitude (Längengrad).
// Standard hier ist Berlin (52.52, 13.41).
// Finde deine Koordinaten hier: https://www.latlong.net/
const lat = 52.52; 
const long = 13.41;

async function fetchWeather() {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const temp = Math.round(data.current_weather.temperature);
        const weatherCode = data.current_weather.weathercode;
        
        document.getElementById('temperature').textContent = `${temp}°C`;
        
        // Wettersymbole basierend auf WMO Code zuordnen
        const iconElement = document.getElementById('weather-icon');
        let iconClass = 'fa-cloud'; // Fallback
        
        // Einfache Zuordnung (Sonne, Wolken, Regen, Schnee, Gewitter)
        if (weatherCode === 0) iconClass = 'fa-sun'; // Klar
        else if (weatherCode >= 1 && weatherCode <= 3) iconClass = 'fa-cloud-sun'; // Bewölkt
        else if (weatherCode >= 45 && weatherCode <= 48) iconClass = 'fa-smog'; // Nebel
        else if (weatherCode >= 51 && weatherCode <= 67) iconClass = 'fa-cloud-rain'; // Regen
        else if (weatherCode >= 71 && weatherCode <= 77) iconClass = 'fa-snowflake'; // Schnee
        else if (weatherCode >= 95) iconClass = 'fa-bolt'; // Gewitter
        
        iconElement.className = `fa-solid ${iconClass}`;
        document.getElementById('weather-desc').textContent = getWeatherDescription(weatherCode);

    } catch (error) {
        console.error("Wetter konnte nicht geladen werden:", error);
        document.getElementById('weather-desc').textContent = "Offline";
    }
}

function getWeatherDescription(code) {
    if (code === 0) return "Klar";
    if (code <= 3) return "Bewölkt";
    if (code <= 48) return "Nebel";
    if (code <= 67) return "Regen";
    if (code <= 77) return "Schnee";
    if (code >= 95) return "Gewitter";
    return "Wetter";
}

// Wetter beim Laden holen
fetchWeather();
// Alle 30 Minuten aktualisieren
setInterval(fetchWeather, 1800000);
