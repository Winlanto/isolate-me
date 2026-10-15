# Isolation Game (Web & AI)

Minimalistlik kahe mängija strateegiamäng **Isolation**, kus inimene mängib Minimax-algoritmil põhineva tehisintellekti (boti) vastu. Projekt on arendatud Reacti ja Vite baasil tehisintellekti agentide abil.

---

## 📸 Ekraanipilt

<!-- Aseta ekraanipilt projekti kausta: docs/screenshot.png -->
![Isolation Game ekraanipilt](./docs/screenshot.png)

---

## 🎮 Mängureeglid

Mäng põhineb aine tehisintellekti 1. koduülesande (`kodu1.js`) loogikal:

1. Mängulaud on **3x3** ruudustik.
2. Mängus on **üks ühine nupp**, mis alustab ruudustiku positsioonilt **2** (indeks 1).
3. Algusruut söestub koheselt mängu käivitumisel.
4. Mängija ja bot teevad käike kordamööda, liigutades ühist nuppu ühe sammu võrra neljas suunas (**üles, alla, vasakule, paremale**).
5. Iga ruut, kuhu astutakse, söestub ja muutub jäädavalt läbipääsmatuks.
6. Mängija, kelle käigukorral pole enam ühtegi vaba naaberruutu, **kaotab mängu**.

---

## 🛠 Tehnoloogiapino

- **Käivitus ja kooste:** Vite
- **Kasutajaliides:** React (Vanilla JS / JSX, ilma väliste UI teekideta)
- **Kujundus:** Puhas CSS (CSS Grid, CSS Flexbox, modernne reset, Tiffany Blue bränding)
- **AI mootor:** Minimax algoritm puhtas JavaScript moodulis (`src/utils/minimax.js`)
- **Versioonihaldus:** Git (Conventional Commits)

---

## 📁 Projekti struktuur

Tehis2/
├── index.html              # HTML pealeht
├── GEMINI.md               # Agendi arendusreeglid ja juhised
├── package.json            # Projekti skriptid ja sõltuvused
├── docs/
│   └── screenshot.png      # Mängu ekraanipilt (paiguta fail siia kausta)
└── src/
    ├── main.jsx            # Reacti sisenemispunkt
    ├── App.jsx             # Rakenduse peakoostaja
    ├── index.css           # Lähtestus, CSS Grid ja kujundusstiilid
    ├── components/
    │   ├── Header.jsx      # Kleepuv päis Tiffany Blue stiilis
    │   ├── Rules.jsx       # Reeglite rippmenüü
    │   ├── Board.jsx       # 3x3 mänguväli ja ruutude olekud
    │   └── Game.jsx        # Mängu olekumasin ja käikude juhtimine
    └── utils/
        └── minimax.js      # Puhas Minimax otsustusloogika ja tehisintellekt

---

## 🐛 Teadaolevad vead ja agendi omapärad (Known Quirks / Bugs)

- **Võitja tähistus (AI iseseisev lahendus):** Mängu lõppseisus otsustas tehisintellekti agent algselt kavandatud lihtsa nupumärgenduse asemel lisada võidutrofee ikooni (`🏆 P` või `🏆 B`). Lahendus osutus visuaalselt selgeks ja jäeti rakendusse püsima.
- **Reeglite rippmenüü noole suund:** Komponendis `Rules.jsx` esineb väike visuaalne vastuolu — menüü avamisel/sulgemisel ei kattu teksti indikaatori noole suund (▲ / ▼) alati loogilise avatud/suletud olekuga (vajab nupu sildi ümberpööramist).

---

## 🔮 Edasised arendussammud (Roadmap)

1. **Kasutajaliidese pisivigade parandamine:**
   - Komponendi `Rules.jsx` rippmenüü noole loogika viimine vastavusse tegeliku olekuga.
   - Mängu taaskäivituse (`Reset / New Game`) visuaalse sujuvuse lihvimine.
2. **Täielik mobiilne kohandatavus (Responsive Design):**
   - Meediapäringute (`@media`) lisamine ruudustiku (`.board`) ja rippmenüü skaleerimiseks väiksematel ekraanidel.
   - Puutetundlike ekraanide nuppude ja klikitavate alade optimeerimine mobiilseadmetele.
3. **Dokumentatsiooni täiendamine:**
   - Mobiilivaate kuvatõmmiste lisamine kausta `docs/`.
   - Vigade nimekirja ajakohastamine pärast paranduste avalikustamist.

---

## 🚀 Käivitamine lokaalselt

### Eeltingimused

- Node.js (versioon 18 või uuem)
- npm

### Paigaldus ja käivitus

1. Klooni repositoorium ja liigu kausta:
   git clone [https://github.com/Winlanto/isolate-me.git](https://github.com/Winlanto/isolate-me.git)
   cd Tehis2

2. Paigalda sõltuvused:
   npm install

3. Käivita arendusserver:
   npm run dev
   Ava brauseris kuvatud aadress (tavaliselt http://localhost:5173).

4. Koosta tootmisversioon (Build):
   npm run build
