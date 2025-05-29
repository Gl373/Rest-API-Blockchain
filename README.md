# CryptoChain

CryptoChain är en Node.js-applikation som simulerar ett blockkedjesystem, utformad som ett REST API för att skapa, lista och hämta block i en blockkedja. Projektet fokuserar på proof-of-work-validering och persistent lagring.

## Projektbeskrivning

Detta projekt är utvecklat som en inlämningsuppgift och efterliknar en enkel blockkedja. Applikationen låter användare:

- Skapa nya block med transaktionsdata via REST-endpoints (`POST /api/blocks`)
- Lista alla block i blockkedjan (`GET /api/blocks`)
- Hämta specifika block baserat på hash (`GET /api/blocks/:hash`)
- Validera block med en proof-of-work-mekanism
- Persistera blockkedjan till en JSON-fil (`blockchain.json`)
- Logga fel och applikationshändelser till en fysisk loggfil (`errors.log`)

Applikationen är byggd enligt MVC-designmönstret, använder ES6-moduler, följer testdriven utveckling (TDD) och inkluderar centraliserad felhantering och loggning för robusthet.

## Funktioner

- **REST API:** Endpoints för att skapa, lista och hämta block.
- **Proof-of-Work:** Varje block kräver en hash som uppfyller ett svårighetskrav.
- **Persistent lagring:** Blockkedjan sparas i `blockchain.json` och laddas automatiskt vid serverstart.
- **Felhantering & loggning:** Alla fel loggas till `errors.log`.
- **Testdriven utveckling:** Tester finns för block, blockchain och hash-funktionalitet.
- **Separerad testkedja:** Tester använder en separat fil (`blockchain.test.json`) för att inte påverka den riktiga kedjan.

## Teknisk struktur

- **Models:** Block, Blockchain, Transaction, m.m.
- **Controllers:** Hanterar API-logik och validering.
- **Routes:** Definierar API-endpoints.
- **Middleware:** Felhantering, async-catch, m.m.
- **Utilities:** Hash-funktion, konstanter, m.m.

## Installation och körning

### Förutsättningar

- Node.js (version 18 eller senare)
- npm (ingår i Node.js)
- Postman (för att testa API-endpoints)

### Steg-för-steg

1. Klona repot och navigera till projektmappen:
   ```bash
   git clone <repo-url>
   cd <mapp>
   ```
2. Installera beroenden:
   ```bash
   npm install
   ```
3. Starta servern:
   ```bash
   npm run dev
   ```
4. Testa API:et med t.ex. Postman.

### Testning

Kör tester med:
```bash
npm test
```
Testerna använder en separat fil (`blockchain.test.json`) och påverkar inte den riktiga blockkedjan.

## Exempel på API-anrop

**Skapa ett nytt block:**
```http
POST /api/blocks
Content-Type: application/json

{
  "id": "tx123",
  "amount": 100,
  "sender": "Alice",
  "receiver": "Bob"
}
```

**Lista alla block:**
```http
GET /api/blocks
```

**Hämta ett block via hash:**
```http
GET /api/blocks/<hash>
```

