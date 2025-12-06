<?php
// public/football_odds.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// --- 1. SETTINGS ---
// ⚠️ WARNING: This key was exposed in chat. If it stops working, regenerate it at api-football.com
$apiKey = 'ea5cdc6feda5c673f637ee94306e844a'; 

$cacheFile = 'odds_cache.json';
$cacheTime = 1800; // Cache for 30 Minutes (Saves your quota)

// League IDs: EPL(39), La Liga(140), Serie A(135), Bundesliga(78), Ligue 1(61)
$leagues = [39, 140, 135, 78, 61]; 
// -------------------

// 2. CHECK CACHE
if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTime)) {
    echo file_get_contents($cacheFile);
    exit;
}

// 3. FETCH DATA
$matches = [];
$date = date('Y-m-d'); // Today's matches

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://v3.football.api-sports.io/fixtures?date=" . $date,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "x-rapidapi-host: v3.football.api-sports.io",
        "x-rapidapi-key: " . $apiKey
    ],
]);
$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);
// 4. PROCESS DATA
if ($httpCode === 200 && $response) {
    $data = json_decode($response, true);
    
    if (isset($data['response'])) {
        foreach ($data['response'] as $fixture) {
            // Filter: Must be a target league AND match not finished/cancelled yet
            if (in_array($fixture['league']['id'], $leagues)) {
                $status = $fixture['fixture']['status']['short'];
                
                // Keep NS (Not Started), LIVE, HT, ET
                if(in_array($status, ['NS', '1H', 'HT', '2H', 'ET', 'P', 'LIVE'])) {
                    
                    // NOTE: Real odds require a paid plan request per match.
                    // We generate realistic mock odds here for the visual widget.
                    $homeOdd = number_format((rand(140, 350) / 100), 2);
                    $drawOdd = number_format((rand(280, 400) / 100), 2);
                    $awayOdd = number_format((rand(150, 550) / 100), 2);

                    $matches[] = [
                        'id' => $fixture['fixture']['id'],
                        'time' => date('H:i', strtotime($fixture['fixture']['date'])),
                        'league' => $fixture['league']['name'],
                        'home' => $fixture['teams']['home']['name'],
                        'home_logo' => $fixture['teams']['home']['logo'],
                        'away' => $fixture['teams']['away']['name'],
                        'away_logo' => $fixture['teams']['away']['logo'],
                        'status' => $status,
                        'odds' => [
                            'home' => $homeOdd,
                            'draw' => $drawOdd,
                            'away' => $awayOdd
                        ]
                    ];
                }
            }
        }
    }
    
    // Return top 5 matches
    $output = json_encode(array_slice($matches, 0, 5));
    file_put_contents($cacheFile, $output);
    echo $output;
} else {
    // If API fails (e.g., bad key), try to return old cache or empty array
    echo file_exists($cacheFile) ? file_get_contents($cacheFile) : json_encode([]);
}
?>
