# Dog App 🐕

En React-applikation för att generera slumpmässiga hundbilder, spara favoriter och betygsätta dem.

## Funktioner

- **Hundgenerator**: Generera slumpmässiga hundbilder från Dog CEO API
- **Betygsättning**: Ge stjärnbetyg (1-5) och skriv beskrivningar
- **Favoriter**: Spara och hantera dina favorithundar
- **Ta bort**: Radera favoriter från listan
- **Rasvisning**: Se hundras på både hemsidan och favoritsidan
-
2. Installera dependencies:
```bash
npm install
```

## Kör applikationen

Starta utvecklingsservern:
```bash
npm run dev
```

Öppna webbläsaren och gå till den URL som visas (vanligtvis `http://localhost:5173` eller nästa tillgängliga port).

## Bygg appen

```bash
npm run build
```

## API

Appen använder [Dog CEO API](https://dog.ceo/dog-api/) för att hämta hundbilder:
- Slumpmässig bild: `https://dog.ceo/api/breeds/image/random`
- Specifik ras: `https://dog.ceo/api/breed/{breed}/images/random`
- Lista över raser: `https://dog.ceo/api/breeds/list/all`

## Licens

Detta projekt är skapat för utbildningssyfte.