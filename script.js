// Funktion zum Abrufen der Geräte aus der Datenbank
function ladeGeraete() {
    fetch('api.php') // Anfrage an die API-Datei
        .then(response => response.json())
        .then(data => {
            const liste = document.getElementById('geraeteListe');
            liste.innerHTML = ''; // Liste zurücksetzen
            data.forEach(geraet => {
                const listItem = document.createElement('li');
                listItem.textContent = `${geraet.name} (${geraet.typ})`;
                liste.appendChild(listItem);
            });
        })
        .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
}

// Funktion zum Hinzufügen eines neuen Geräts
function neuesGeraet(name, typ) {
    // Gerät über POST an die API hinzufügen
    fetch('api.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, typ }) // Gerätedaten als JSON senden
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            ladeGeraete(); // Liste neu laden, wenn das Hinzufügen erfolgreich war
        } else {
            console.error('Fehler beim Hinzufügen des Geräts:', data.message);
        }
    })
    .catch(error => console.error('Fehler beim Hinzufügen des Geräts:', error));
}

// Event Listener für das Formular
document.getElementById('geraeteForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Standardformularverhalten verhindern
    const name = document.getElementById('name').value;
    const typ = document.getElementById('typ').value;
    neuesGeraet(name, typ); // Neues Gerät hinzufügen
    event.target.reset(); // Formular zurücksetzen
});

// Geräte beim Seitenaufruf laden
ladeGeraete();
