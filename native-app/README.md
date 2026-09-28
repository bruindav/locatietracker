<!-- Fix: achtergrondlocatie-plugin, AndroidManifest-rechten en eigen app-icoon toegevoegd —
     alle drie de "nog te doen"-punten uit fix-13/fix-20 zijn nu afgerond (branch fix-21) -->
# Locatietracker — native Android-app (Capacitor)

Dit is een kant-en-klaar Capacitor-project dat de webversie (`www/`, een kopie
van de hoofdmap van de repo) verpakt tot een echte Android-app. Alles staat
klaar; hieronder de stappen die je op je eigen laptop nog moet zetten.

## Wat hier al klaarstaat
- `capacitor.config.ts` — app-id `nl.bruindav.locatietracker`, appnaam "Locatietracker"
- `www/` — kopie van de webversie, bijgewerkt t/m **fix-19** (route plannen door
  punten te tikken, punten verplaatsen/verwijderen via lang-druk, hoogtemeters,
  looprichting-pijl zonder kompas + rode waarschuwing bij afwijking)
- `android/` — volledig gegenereerd Android Studio-project, inclusief:
  - **Achtergrondlocatie** via `@capacitor-community/background-geolocation`
    (blijft locatie doorgeven met het scherm uit of de app op de achtergrond,
    met verplichte permanente melding "Locatietracker actief")
  - De bijbehorende rechten in `AndroidManifest.xml` (fijne locatie,
    achtergrondlocatie, foreground-service, meldingen)
  - Een **eigen app-icoon** (adaptive icon, navy met het kaartje/wandelaar-logo)
    en bijpassend opstartscherm, gegenereerd uit `icons/icon-512.png`

## Benodigdheden (eenmalig installeren)
1. [Node.js](https://nodejs.org) (LTS-versie)
2. [Android Studio](https://developer.android.com/studio) — installeert ook de Android SDK

## Stappen op je laptop

```bash
cd native-app
npm install            # installeert Capacitor + de background-geolocation-plugin
npm run build:plugins  # bundelt de plugin-JS naar www/js/capacitor-plugins.js
npx cap sync android   # zorgt dat android/ up-to-date is met www/
npx cap open android   # opent het project in Android Studio
```

In Android Studio:
1. Laat Gradle de eerste keer synchroniseren (kan even duren, downloadt build-tools)
2. Sluit je telefoon aan via USB met "USB-debugging" aan (Instellingen → Over
   telefoon → 7x op buildnummer tikken → Ontwikkelaarsopties → USB-debugging)
3. Klik op ▶ Run — de app installeert en start direct op je telefoon
4. Bij de eerste keer tracken vraagt Android om locatietoestemming — kies
   **"Toestaan tijdens gebruik"** en zet 'm daarna handmatig op **"Altijd
   toestaan"** via Instellingen → Apps → Locatietracker → Machtigingen →
   Locatie, anders stopt het volgen zodra je het scherm uit doet

Dat is voor een test-installatie voldoende. Play Store is niet nodig.

## Let op bij de volgende keer dat je www/ bijwerkt
Kopieer je opnieuw `index.html`, `manifest.json`, `favicon.ico` en `icons/`
vanuit de hoofdmap van de repo naar `native-app/www/` (zoals eerder): de
achtergrondlocatie-hook zit inmiddels **ook al in de hoofdmap-versie** van
`index.html` (onschadelijk op de website — valt daar automatisch terug op de
gewone browserlocatie), dus een simpele kopie is genoeg. Draai daarna nog wel
`npx cap sync android` om de wijzigingen door te voeren naar het Android-project;
`npm run build:plugins` hoeft alleen opnieuw als de plugin zelf wordt bijgewerkt.

## Mogelijke vervolgstappen
- Android vraagt sinds versie 11 een **losse bevestiging** voor "Altijd
  toestaan"-locatietoegang; dat kun je met de plugin niet automatisch afdwingen,
  alleen duidelijk uitleggen (zie stap 4 hierboven).
- Batterijoptimalisatie van de telefoon kan achtergrond-tracking na verloop
  van tijd toch pauzeren; instellen op "Niet optimaliseren" voor Locatietracker
  voorkomt dat.
