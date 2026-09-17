# Locatietracker — native Android-app (Capacitor)

Dit is een kant-en-klaar Capacitor-project dat de webversie (`www/`, een kopie
van de hoofdmap van de repo) verpakt tot een echte Android-app. Alles staat
klaar; hieronder de stappen die je op je eigen laptop nog moet zetten.

## Wat hier al klaarstaat
- `capacitor.config.ts` — app-id `nl.bruindav.locatietracker`, appnaam "Locatietracker"
- `www/` — kopie van de huidige webversie (index.html, manifest, iconen)
- `android/` — volledig gegenereerd Android Studio-project

## Benodigdheden (eenmalig installeren)
1. [Node.js](https://nodejs.org) (LTS-versie)
2. [Android Studio](https://developer.android.com/studio) — installeert ook de Android SDK

## Stappen op je laptop

```bash
cd native-app
npm install          # installeert Capacitor (staat al in package.json)
npx cap sync android # zorgt dat android/ up-to-date is met www/
npx cap open android # opent het project in Android Studio
```

In Android Studio:
1. Laat Gradle de eerste keer synchroniseren (kan even duren, downloadt build-tools)
2. Sluit je telefoon aan via USB met "USB-debugging" aan (Instellingen → Over
   telefoon → 7x op buildnummer tikken → Ontwikkelaarsopties → USB-debugging)
3. Klik op ▶ Run — de app installeert en start direct op je telefoon

Dat is voor een test-installatie voldoende. Play Store is niet nodig.

## Nog te doen zodra je hier verder gaat
- **Achtergrondlocatie**: een plugin toevoegen zoals `@capgo/background-geolocation`
  of `@capacitor-community/background-geolocation`, en de trackingcode in
  `www/index.html` omzetten van `navigator.geolocation.watchPosition` naar de
  plugin's watcher. Android vereist dan een permanente melding zolang er wordt
  getrackt (verplicht vanaf Android 8+).
- Rechten toevoegen in `android/app/src/main/AndroidManifest.xml`:
  `ACCESS_FINE_LOCATION`, `ACCESS_BACKGROUND_LOCATION`, `FOREGROUND_SERVICE`,
  `FOREGROUND_SERVICE_LOCATION` (verplicht vanaf Android 14).
- Eigen app-icoon voor Android (adaptive icon) genereren uit `icons/icon-512.png`,
  bijvoorbeeld met de Capacitor Assets-tool (`npx @capacitor/assets generate`).

## Belangrijk: www/ bijwerken
`www/` is nu een momentopname van de webversie. Zodra je hier verdergaat, kopieer
je de laatste `index.html`, `manifest.json`, `favicon.ico` en `icons/` opnieuw
vanuit de hoofdmap van de repo naar `native-app/www/`, en draai dan
`npx cap sync android` om de wijzigingen door te voeren naar het Android-project.
