<?php
// Verbindung zur Datenbank herstellen
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "smarthome";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung prüfen
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// Anfrage-Typ ermitteln
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    // GET: Geräte abrufen
    $sql = "SELECT id, name, typ FROM smarthome"; // Tabelle `smarthome`
    $result = $conn->query($sql);

    $geraete = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $geraete[] = $row;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($geraete);
}

if ($method == 'POST') {
    // POST: Neues Gerät hinzufügen
    $input = json_decode(file_get_contents('php://input'), true);
    $name = $conn->real_escape_string($input['name']);
    $typ = $conn->real_escape_string($input['typ']);

    $sql = "INSERT INTO smarthome (name, typ) VALUES ('$name', '$typ')"; // Tabelle `smarthome`
    $result = $conn->query($sql);

    header('Content-Type: application/json');
    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Fehler beim Einfügen des Geräts.']);
    }
}

$conn->close();
?>
