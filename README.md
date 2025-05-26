# CryptoChain
En Node.js-applikation som simulerar ett blockkedjesystem, utformad som ett REST API för att skapa, lista och hämta block i en blockkedja, med fokus på proof-of-work-validering och persistent lagring.

## Projektbeskrivning

Detta projekt utvecklades som en inlämningsuppgift för att skapa en backend Node.js-applikation som efterliknar en blockkedja. Applikationen, kallad CryptoChain, låter användare:
- Skapa nya block med komplexa dataobjekt
- Lista alla block i blockkedjan
- Hämta specifika block baserat på index eller hash
- Validera block med en proof-of-work-mekanism
- Persistera blockkedjan till en JSON-fil för hållbarhet
- Logga fel och applikationshändelser centralt till en fysisk loggfil

Applikationen är byggd med MVC-designmönstret, följer testdriven utveckling (TDD) för skapande av block och inkluderar centraliserad felhantering och loggning för robusthet.

### Hur projektet uppfyller kraven

## Installation och körning

### Förutsättningar

- Node.js (version 18 eller senare)
- npm (ingår i Node.js)
- Postman (för att testa API-endpoints)

### Steg-för-steg installation
