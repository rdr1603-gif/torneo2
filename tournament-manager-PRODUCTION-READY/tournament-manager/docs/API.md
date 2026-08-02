# 📡 API Reference

Base URL: `https://api.tournament-manager.com` (o `http://localhost:3000` en dev)

---

## Health Check

### GET /api/health

Verificar que el servidor está funcionando.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "environment": "production",
  "uptime": 3600
}
```

**Status Code:** `200`

---

## Tournaments

### GET /api/tournaments

Listar todos los torneos del usuario.

**Query Parameters:**
- `organizationId` (required) - ID de la organización
- `status` - Filtrar por estado (DRAFT, SCHEDULED, IN_PROGRESS, etc.)
- `page` - Paginación (default: 1)
- `limit` - Items por página (default: 10)

**Response:**
```json
{
  "data": [
    {
      "id": "tournament-1",
      "name": "Torneo Verano 2024",
      "status": "IN_PROGRESS",
      "format": "ROUND_ROBIN",
      "startDate": "2024-12-15T00:00:00Z",
      "endDate": "2024-12-22T00:00:00Z",
      "teamCount": 8,
      "matchCount": 28
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 3,
    "pages": 1
  }
}
```

---

### POST /api/tournaments

Crear un nuevo torneo.

**Body:**
```json
{
  "name": "Torneo Verano 2024",
  "categoryId": "cat-1",
  "organizationId": "org-1",
  "format": "ROUND_ROBIN",
  "startDate": "2024-12-15T00:00:00Z",
  "endDate": "2024-12-22T00:00:00Z",
  "maxTeams": 16,
  "minTeamsPerZone": 4,
  "hasZones": true,
  "matchDurationMinutes": 45,
  "breakBetweenMatches": 15,
  "courtCount": 2
}
```

**Response:**
```json
{
  "id": "tournament-abc123",
  "name": "Torneo Verano 2024",
  "status": "DRAFT",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Status Code:** `201 Created`

---

### GET /api/tournaments/:id

Obtener detalles de un torneo específico.

**Response:**
```json
{
  "id": "tournament-1",
  "name": "Torneo Verano 2024",
  "status": "IN_PROGRESS",
  "format": "ROUND_ROBIN",
  "teamCount": 8,
  "matchCount": 28,
  "matchesCompleted": 12,
  "standings": [...],
  "matches": [...]
}
```

**Status Code:** `200`

---

## Matches

### GET /api/tournaments/:tournamentId/matches

Listar partidos de un torneo.

**Query Parameters:**
- `status` - Filtrar por estado
- `courtId` - Filtrar por cancha

**Response:**
```json
{
  "data": [
    {
      "id": "match-1",
      "homeTeam": { "id": "team-1", "name": "Los Ases" },
      "awayTeam": { "id": "team-2", "name": "Los Cracks" },
      "status": "SCHEDULED",
      "scheduledAt": "2024-12-16T10:00:00Z",
      "court": { "id": "court-1", "name": "Cancha 1" }
    }
  ]
}
```

---

### PUT /api/matches/:id/result

Registrar resultado de un partido.

**Body:**
```json
{
  "homeScore": 2,
  "awayScore": 1,
  "set1Home": 6,
  "set1Away": 4,
  "set2Home": 6,
  "set2Away": 3,
  "notes": "Buen partido"
}
```

**Response:**
```json
{
  "id": "match-1",
  "status": "COMPLETED",
  "result": {
    "homeScore": 2,
    "awayScore": 1,
    "set1Home": 6,
    "set1Away": 4,
    "set2Home": 6,
    "set2Away": 3
  }
}
```

**Status Code:** `200`

---

## Standings

### GET /api/tournaments/:id/standings

Obtener tabla de posiciones.

**Query Parameters:**
- `zoneId` - Filtrar por zona (opcional)

**Response:**
```json
[
  {
    "position": 1,
    "team": { "id": "team-1", "name": "Los Ases" },
    "matchesPlayed": 7,
    "wins": 7,
    "losses": 0,
    "draws": 0,
    "points": 21,
    "pointsFor": 14,
    "pointsAgainst": 2
  },
  {
    "position": 2,
    "team": { "id": "team-2", "name": "Los Cracks" },
    "matchesPlayed": 7,
    "wins": 5,
    "losses": 2,
    "draws": 0,
    "points": 15,
    "pointsFor": 11,
    "pointsAgainst": 8
  }
]
```

**Status Code:** `200`

---

## Smart Scheduler (Motor Inteligente) ⭐

### POST /api/smart-scheduler/next-match

Obtener recomendación del próximo partido a jugar.

**Body:**
```json
{
  "tournamentId": "tournament-1",
  "courtId": "court-1"
}
```

**Response:**
```json
{
  "selectedMatch": {
    "id": "match-15",
    "homeTeam": {
      "id": "team-3",
      "name": "Los Ases",
      "player1": "Juan Pérez",
      "player2": "Carlos López"
    },
    "awayTeam": {
      "id": "team-4",
      "name": "Los Nuevos",
      "player1": "Maria García",
      "player2": "Ana Martinez"
    },
    "court": { "id": "court-1", "name": "Cancha 1" },
    "status": "WAITING_TEAMS"
  },
  "topRecommendations": [
    {
      "matchId": "match-15",
      "score": 87,
      "confidence": "HIGH",
      "reasoning": [
        "✓ Pareja lleva 42 minutos esperando",
        "✓ Energía equilibrada en ambas parejas",
        "✓ Buen balance competitivo"
      ],
      "breakdown": {
        "waitingScore": 95,
        "zoneBalance": 80,
        "fatigueScore": 75,
        "momentumScore": 85,
        "balanceScore": 78,
        "schedulingScore": 72,
        "synergyScore": 65
      }
    },
    {
      "matchId": "match-12",
      "score": 76,
      "confidence": "MEDIUM",
      "reasoning": ["Alternativa válida"]
    }
  ],
  "contextSnapshot": {
    "totalTeams": 8,
    "teamsWaiting": 3,
    "matchesScheduled": 15,
    "courtsAvailable": 1
  }
}
```

**Status Code:** `200`

---

## Feedback

### POST /api/feedback

Enviar feedback sobre una recomendación.

**Body:**
```json
{
  "matchId": "match-15",
  "tournamentId": "tournament-1",
  "rating": "good",
  "comment": "Excelente recomendación, fue un gran partido"
}
```

**Response:**
```json
{
  "id": "feedback-1",
  "status": "recorded",
  "timestamp": "2024-01-15T10:35:00Z"
}
```

**Status Code:** `201 Created`

---

## A/B Testing

### GET /api/ab-testing/results

Obtener resultados de A/B testing.

**Query Parameters:**
- `tournamentId` - Filtrar por torneo

**Response:**
```json
{
  "control": {
    "variantId": "control",
    "matchesGenerated": 245,
    "avgWaitingTime": 14.2,
    "userSatisfaction": 0.82,
    "participantsCompleted": 12
  },
  "variant-a": {
    "variantId": "variant-a",
    "matchesGenerated": 238,
    "avgWaitingTime": 11.8,
    "userSatisfaction": 0.89,
    "participantsCompleted": 11
  }
}
```

**Status Code:** `200`

---

## Error Handling

Todos los errores retornan con estructura estándar:

```json
{
  "error": "ERROR_CODE",
  "message": "Descripción del error en español",
  "statusCode": 400
}
```

### Status Codes Comunes

| Code | Significado |
|------|------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

## Rate Limiting

- Limite: 1000 requests por hora
- Header: `X-RateLimit-Remaining`

---

## WebSocket Events

Conectar a `wss://api.tournament-manager.com/socket.io`

### Eventos recibidos:

```javascript
socket.on('match:created', (match) => {})
socket.on('match:started', (match) => {})
socket.on('match:completed', (match) => {})
socket.on('standings:updated', (standings) => {})
socket.on('team:waiting', (notification) => {})
socket.on('team:timeout', (notification) => {})
```

---

## Autenticación

Usar Bearer token en header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

**Última actualización:** 15 de Enero, 2024
