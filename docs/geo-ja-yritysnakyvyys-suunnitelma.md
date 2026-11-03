# Hiihtogreeni: GEO-korjaukset ja näkyvyys yritysryhmille

**Laadittu:** 2.11.2026
**Tila (3.11.2026):** vaiheet 1, 3, 4 ja 7 ovat tuotannossa (hiihtogreeni #15, #17, #19–#21; levifinland2026 #45–#47: ALV 25,5 % huoneille, vähimmäisveloitus 3 yötä, varausehdot 1.4). Vaihe 5 on PR:ssä levifinland2026 #48 ja vaihe 6 PR:ssä hiihtogreeni #22 (`docs/geo/ulkoiset-luonnokset.md`). Vaihe 2 on siirretty toukokuuhun 2027. Omistajalle jäävät luonnosten lähettäminen, Google Business Profile ja 10.12. katselmoinnin tarkistuslista.
**Korvaa:** `hiihtogreeni-geo-analyysi.md` ja `hiihtogreeni-yritysnakyvyys-suunnitelma.md`. Ne jäävät taustaksi. Niissä olevat virheet on korjattu tähän (kohta 2.2).
**Repot:** `hiihtogreeni` (sivusto) ja `levifinland2026` (varausjärjestelmä, API ja MCP osoitteessa cabins.levifinland.fi)

---

## 1. Kysymykset omistajalle ennen aloitusta

Vaihe alkaa vasta, kun sen kysymyksiin on vastattu. Vastaa suoraan taulukkoon tai erikseen.

### A. Pikakorjaukset (vaihe 1)

| # | Kysymys | Vastaus |
|---|---|---|
| A1 | Etusivun äkkilähtöbanneri sanoo "−20 % normaalihinnasta", mutta näyttää hinnat siivouksen kanssa (2 746 € / 3 360 € = −18 %). Kumpi korjaus: **(a)** teksti muotoon "−20 % majoitushinnasta" (suositus) vai **(b)** prosentti lasketaan kokonaishinnasta (näkyisi −18 %)? | |
| A2 | Suksihuoltotila: mökki-sivun mukaan se on "kellarikerroksessa, noin 50 m², vuokrataan erillisen sopimuksen mukaan", joukkuesivun mukaan "yli 50 m², mökin sisällä, ei jaettu kellari". Mikä on oikein: sijainti, koko, onko tila aina vain yhden ryhmän käytössä ja hinta (API: 250 € / varaus)? | |
| A3 | Kokoustilan ALV: varausjärjestelmä laskee 13,5 % myös kokoustilasta, siivouksesta ja liinavaatteista. Onko tämä kirjanpitäjän mukaan oikein? | |
| A4 | Sähköauton lataus: autotallissa on 1- ja 3-vaiheiset pistorasiat. Voiko vieras ladata siellä, ja maksaako se? Lämmitystolpista lataaminen on kielletty. | |

A1 = (a)
A2 = (kellarissa, yhden joukkueen käytössä, 50m2 250 € / varaus, ei vuokrattavissa ilman hiihtogreeni a tai b:n varausta)
A3 = (Kokoustilan ALV on 25,5 %, kun sisältyy koko tilan varaukseen, niin ilmainen; 13,5 % on oikein myös siivoukseen ja liinavaatteisiin)
A4 = Ei mainosteta autotallin vuokrausta. Lämmitystolpista / ulkopistorasioista lataaminen kielletty.

### B. Varauspyyntöjen suojaus (vaihe 2)

| # | Kysymys | Vastaus |
|---|---|---|
| B1 | Nyt varauspyyntö lukitsee päivät heti viideksi päiväksi. Botti voi vaihtuvilla sähköposteilla tukkia sesonkiviikkoja ja samalla estää oikeiden asiakkaiden pyynnöt (yhteinen raja on 10 pyyntöä tunnissa). Hyväksytkö, että **API:n ja MCP:n kautta** tulevat pyynnöt lukitsevat päivät vasta, kun vieras klikkaa vahvistuslinkkiä sähköpostissaan? | |
| B2 | Koskeeko sama myös varauskalenterin lomaketta? Suositus: ei koske toistaiseksi, koska lomakkeella on lisäksi IP-raja ja kitka karkottaisi oikeita asiakkaita. | |
| B3 | Kuinka kauan vahvistuslinkki on voimassa? Suositus: 24 h. Vahvistamaton pyyntö ei lukitse päiviä, mutta tulee sinulle näkyviin. | |

B1 = korjataan tämä asia vasta kauden jälkeen keväällä 2027 (toukokuu)
B2 = ok
B3 = pidetään vielä se joka on nyt (katsotaan tarkemmin B1 kanssa toukokuussa 2027)

### C. Yrityssivu (vaihe 3)

| # | Kysymys | Vastaus |
|---|---|---|
| C1 | **Vähimmäiskesto 3 yötä** on suurin este: johtoryhmän strategiapäivät ovat yleensä 1–2 yötä. Rajapinta hylkää 2 yön varauksen. Sallitaanko hiljaisina kausina (toukokuu–kesäkuu, ruska, marraskuu) 2 yötä arkena? Jos sallitaan, muutos tehdään varausjärjestelmän sääntöihin ennen sivun julkaisua. | |
| C2 | Onko kokoustila yksityinen, jos toinen huoneisto on muiden vieraiden käytössä? Onko tilalla oma sisäänkäynti? | |
| C3 | Kokoustilan koko (m²), pöytäjärjestys ja muunneltavuus sekä näytön koko | |
| C4 | Onko videoneuvottelukamera tai -kaiutin? Entä äänentoisto? | |
| C5 | Langattoman verkon nopeus: mittaa lataus- ja lähetysnopeus (Mbps) kokoustilassa. | |
| C6 | Hankitaanko fläppitaulu tai valkotaulu? Ostajat odottavat jompaakumpaa. | |
| C7 | Ruokailu: onko catering-kumppani, ja mitä aterioita sen kautta saa? Saako kumppanin nimetä sivulla? | |
| C8 | Kuljetus Kittilän lentokentältä: kumppani ja hintataso, vai ohjataanko taksiin / vuokra-autoon? | |
| C9 | Ohjelmapalvelukumppanit (husky, moottorikelkka, golf, opastetut retket). Saako ne nimetä? | |
| C10 | Lasku yritykselle: onnistuuko, ja millainen ALV-erittely laskulle tulee? | |
| C11 | Poikkeavatko yritysvarausten peruutusehdot tavallisista? | |
| C12 | Sivun nimi ja paikka: **(a)** "Strategiapäivät" (`/strategiapaivat/`, `/en/leadership-offsite/`) vai **(b)** laajempi "Yrityksille" (`/yrityksille/`, `/en/companies/`)? Lisätäänkö päävalikkoon, vai riittääkö linkki etusivun "Ryhmille"-osiosta ja joukkuesivulta? Suositus: (b), koska samalla sivulla voi esitellä kick-offit, hallituksen kokoukset ja asiakastilaisuudet. | |
| C13 | Onko tiedossa yritysasiakas, joka suostuisi asiakastarinaan? | |

C1 = Saa vuokrata myös 1 tai kahdeksi yöksi, mutta hinta on minimissään 3 yön hinta
C2 = Kokoustila on yksityinen, ei jaettu muiden vieraiden kanssa, oma sisäänkäynti ja sisäänkäynti myös ulkoa
C3 = en tiedä neliömäärää. Näytön koko en tiedä (näkyy kuvassa, kun se laitetaan - videotykki ja screeni pääasiallisena näyttönä)
C4 = ei ole
C5 = Ei mainita
C6 = pöytäfläppitaulu on olemassa. voisimme hankkia kyllä valkotaulunkin sinne
C7 = Ei
C8 = taksi ja vuokra-auto (ei mainosteta mitään)
C9 = Ei ole
C10 = Onnistuu - Levin Hiihtogreeni Oy lähettää laskun
C11 = ei poikkea
C12 = (b) laajempi yrityksille
C13 = Ei ole


### D. Esite (vaihe 4)

| # | Kysymys | Vastaus |
|---|---|---|
| D1 | Kuka tekee ulkoasun: **(a)** Claude tekee sen sivuston tyylillä HTML-pohjasta, joka muunnetaan PDF:ksi (suositus: faktat päivittyvät samasta lähteestä kuin sivusto), vai **(b)** graafikko tai Canva Clauden tekstien pohjalta? | |
| D2 | Näytetäänkö esitteessä hintaesimerkit (laskentapäivän kanssa), vai pelkkä "hinnat varauskalenterista"? Suositus: näytetään, koska ostaja vertaa hintoja jo ensimmäisessä vaiheessa. | |
| D3 | Kieliversiot: suomi ja englanti? | |
| D4 | Mitkä kuvat saa käyttää? Kokoustilasta tarvitaan uusi kuva työpajakäytössä (kohta 6). | |

D1 = Claude tekee
D2 = Kyllä, alkaen hinta ja esimerkki työpajan kulusta ja muusta ohjelmasta. Maininta, että hinta kattaa vain majoituksen, liinavaatteet pedattuina ja loppusiivouksen sekä neuvottelutilan käytön
D3 = Kyllä, suomi ja englanti
D4 = Kerro minne laitan kuvat, niin voin lisätä ne.

### E. Mittaus (vaihe 7)

| # | Kysymys | Vastaus |
|---|---|---|
| E1 | Lisätäänkö yrityskysymykset 10.12. ajastetun katselmoinnin kiinteiden kysymysten joukkoon (suositus), vai seurataanko niitä erikseen? | |
| E2 | Lisätäänkö sivuston yhteydenottolomakkeeseen vapaaehtoinen kysymys "Mistä löysit meidät?"? (Varausjärjestelmän `source`-kenttää ei käytetä tähän, koska se tarkoittaa agentin nimeä.) | |

E1 = lisätään
E2 = lisätään

---

## 2. Lähtötilanne (tarkistettu 2.11.2026)

### 2.1 Jo kunnossa

- `LodgingBusiness`- ja `Organization`-merkinnät kaikilla sivuilla: koordinaatit 67.801561, 24.900871, huoneistot A ja B `Apartment`-osina, `ReserveAction`. `FAQPage` hinnoittelu- ja joukkuesivuilla (`src/lib/structured-data.ts`).
- hreflang `fi`, `en-GB` ja `x-default` jokaisella sivulla
- robots.txt sallii tekoälybotit nimeltä. llms.txt ja llms-full.txt sisältävät faktat, hinnat, ehdot sekä API- ja MCP-osoitteet.
- API toimii (`property`, `pricing`, `availability`, `quote`, `inquiries`), ja MCP vastaa (`initialize` ja `tools/list`, kuusi työkalua).
- Sisältö näkyy palvelimen palauttamassa HTML:ssä, ja vapaat jaksot näkyvät tekstinä.

### 2.2 Korjaukset aiempiin dokumentteihin

| Aiempi väite | Todellisuus |
|---|---|
| JSON-LD puuttuu | On jo (2.1). Analyysin hakutyökalu ei nähnyt script-tageja. |
| hreflang puuttuu | On jo (2.1). |
| Äkkilähdön päättymispäivä vaihtelee | Tarjous on liukuva 30 päivän ikkuna. Sivut ja llms-tiedostot välimuistitetaan eri tahtiin, joten päivä voi erota yhden päivän ajan. Tämä ei ole sisältövirhe. |
| WP-polut ovat robots.txt:ssä turhia | Polut palauttavat tarkoituksella 410 Gone. `Disallow` estää botteja näkemästä 410-vastausta ja hidastaa vanhojen osoitteiden poistumista hakuindeksistä, joten se poistetaan. |
| Koordinaatit puuttuvat (TODO 11) | Ne ovat JSON-LD:ssä. |
| "Jokaisella osallistujalla oma makuuhuone" | Pitää paikkansa vain enintään 7 hengelle yhdessä huoneistossa tai enintään 14 hengelle koko talossa. Kohderyhmä on 8–20 henkeä, joten lupaus muotoillaan uudelleen (kohta 5.2). |
| Hotellien kokoushuoneet ovat "tyypillisesti aulan yhteydessä" | Vahvistamaton yleistys. Poistetaan. |
| `sales@visitlevi.fi`, "Arctic Incentives", Naboo | Vahvistamatta. Merkitään selvitettäviksi. |
| GA4-kanavaryhmä tekoälyliikenteelle | GA4 toimii vain suostumuksella ja näkee vain pienen osan liikenteestä. Ensisijainen mittari on Umami. |

### 2.3 Vahvistetut hinnat (`quote`, haettu 2.11.2026)

Vähimmäiskesto on 3 yötä, ja rajapinta hylkää lyhyemmät jaksot (422 `below_minimum_stay`). Kaikissa esimerkeissä on pedatut vuoteet ja liinavaatteet sekä loppusiivous.

| Esimerkki | Jakso | Kokoonpano | Kokoustila | Yhteensä | € / hlö / yö |
|---|---|---|---|---|---|
| A | ma 10.5.–to 13.5.2027 (Hiljainen hetki) | 12 hlö, huoneisto A (7 makuuhuonetta) | 250 € | 2 010 € | noin 56 € |
| B | ma 10.5.–to 13.5.2027 | 14 hlö, koko talo, **jokaiselle oma huone ja kylpyhuone** | maksuton | 3 270 € | noin 78 € |
| C | ti 7.9.–pe 10.9.2027 (Golf & Ruska) | 18 hlö, koko talo | maksuton | 4 030 € | noin 75 € |

Sivulla ja esitteessä hinnat haetaan rajapinnasta eikä tätä taulukkoa kopioida (kohdat 5.3 ja 6.3).

---

## 3. Periaatteet kaikkeen työhön

- **Älä keksi faktoja.** Lähteet: tämän dokumentin kohta 2, omistajan vastaukset kohtaan 1, sivuston sisältö (`src/content/`) ja rajapinnan vastaukset. Jos tieto puuttuu, kirjoita `TODO(omistaja): …`.
- **Hinnat vain `quote`-kutsulla.** Hintoja tai ehtoja ei muuteta tämän suunnitelman puitteissa, paitsi kysymyksen C1 mukaisesti, jos omistaja niin päättää.
- **Ei vahvistamattomia superlatiiveja eikä kilpailijoiden nimiä.**
- **Ulkoiset tekstit tehdään luonnoksina.** Omistaja lähettää ne itse.
- **Varausjärjestelmän kirjoittavat toiminnot testataan vain paikallisesti** SQLite-kopiolla. Vercelin esikatseluympäristö käyttää tuotannon varauskantaa.
- **Pidossa olevat asiat eivät kuulu tähän:** levifinland2026:n kohdat 7.8.2 (Umami kaikkiin sovelluksiin), 7.8.6 (greenfee) ja 7.8.7 (landing).
- Jokaisen vaiheen lopuksi raportoidaan, mitä tehtiin ja mitkä TODO-kohdat jäivät auki.

---

## 4. Vaihe 1 – Pikakorjaukset (hiihtogreeni)

**Edellyttää:** vastaukset A1–A4. Kohdat 1.4 ja 1.5 voi tehdä heti.

| # | Korjaus | Tiedostot |
|---|---|---|
| 1.1 | Äkkilähtöbannerin otsikko, merkki ja meta description vastauksen A1 mukaan, fi ja en | `src/content/fi.ts`, `src/content/en.ts`, `src/components/LastMinuteBanner.tsx` |
| 1.2 | Suksihuoltotilan teksti samaksi mökki- ja joukkuesivulla, gallerian kuvateksteissä ja llms-tiedostoissa vastauksen A2 mukaan | `src/content/*.ts`, `src/lib/llms.ts` |
| 1.3 | ALV-maininta ja sähköauton lataus llms-full.txt:ssä vastausten A3 ja A4 mukaan | `src/content/*.ts`, `src/lib/llms.ts` |
| 1.4 | robots.txt: poistetaan `Disallow` 410-poluilta (`/wp-admin/`, `/wp-json/`, `/feed/`) | `src/app/robots.ts`, testit |
| 1.5 | MCP-osoite alatunnisteen tekoälyavustajarivin jatkoksi (`MCP_URL` on jo valmiina) | `src/components/Footer.tsx` |
| 1.6 | Sivukartan `lastmod` vastaamaan todellisia sisältömuutoksia. Päivä päivitetään, kun sivun sisältö muuttuu, eikä sitä generoida joka buildissa. | `src/app/sitemap.ts` |

**Valmis, kun:** `npm run ci` menee läpi. `curl -s https://www.hiihtogreeni.fi/robots.txt` ei sisällä `Disallow`-rivejä. Etusivun banneri ja llms-tiedostot kertovat alennuksen samalla tavalla.

---

## 5. Vaihe 2 – Varauspyyntöjen vahvistuslinkki (levifinland2026)

**Edellyttää:** vastaukset B1–B3. **Siirretty:** tehdään toukokuussa 2027 kauden jälkeen (B1). Vahvistuslinkin voimassaoloaika katsotaan samalla (B3).

- API:n ja MCP:n `submit_booking_request` tallentaa pyynnön vahvistamattomana. Päivät eivät lukitu, eikä omistajalle lähetetä varausilmoitusta.
- Vieras saa sähköpostin, jossa on vahvistuslinkki (voimassa B3:n mukaan). Klikkauksen jälkeen kulku on sama kuin nyt: päivät lukittuvat viideksi päiväksi, ja omistaja saa ilmoituksen.
- Vastaus agentille kertoo uuden seuraavan vaiheen ("Pyyntö odottaa vieraan vahvistusta sähköpostissa"). Muutos päivitetään OpenAPI-kuvaukseen ja MCP-työkalun kuvaukseen.
- Vahvistamattomat pyynnöt eivät kuluta yhteistä 10 pyynnön tuntirajaa, joten roskapyynnöt eivät estä oikeita.
- Testit ja paikallinen kokeilu SQLite-kopiolla ilman sähköpostin lähetystä (`RESEND_API_KEY` virheellinen).

**Valmis, kun:** paikallisessa testissä vahvistamaton pyyntö ei näy varattuna `availability`-vastauksessa, mutta vahvistettu näkyy.

---

## 6. Vaihe 3 – Yrityssivu (hiihtogreeni)

**Edellyttää:** vastaukset C1, C2, C12. Muut C-kohdat voivat jäädä `TODO`-merkinnöiksi, mutta sivu julkaistaan vasta, kun C3–C5 on vastattu.

### 6.1 Kohderyhmä ja tavoite

8–20 hengen johtoryhmät ja tiimit Suomesta ja ulkomailta. Ostaja on usein johdon assistentti, HR tai toimitusjohtaja, joskus fasilitaattori. Ensisijaiset kaudet ovat Hiljainen hetki (1.5.–15.6.), Golf & Ruska (21.8.–30.9.) ja alkutalvi. Kun yritys kysyy hakukoneelta tai tekoälyavustajalta paikkaa strategiapäiville Lapissa, Hiihtogreenin pitää löytyä, ja agentin pitää pystyä tarkistamaan saatavuus ja hinta.

### 6.2 Positiointi (korjattu)

**Ydinlupaus:** Koko talo omalle ryhmälle. Kokoustila on saman katon alla, jokaisessa makuuhuoneessa on oma kylpyhuone, saunat ovat illaksi omassa käytössä, ja lentokentälle on 20 minuuttia.

**Huoneiden tarkka muotoilu:** "Enintään 14 hengen ryhmälle jokaiselle oma huone ja kylpyhuone koko talossa. Isommat ryhmät (enintään 28 henkeä) jakavat huoneita."

**Kolme kokoonpanoa:**
1. **Koko talo, enintään 14 henkeä:** jokaiselle oma huone ja kylpyhuone, kokoustila maksuton. Suositus johtoryhmälle.
2. **Koko talo, 15–28 henkeä:** kokoustila maksuton, osa huoneista jaetaan.
3. **Yksi huoneisto, enintään 14 henkeä, ja kokoustila (250 €):** edullisin. Kerrotaan avoimesti, mitä yksityisyys tarkoittaa (C2).

### 6.3 Sisältö järjestyksessä (fi ja en vastaavat)

1. Otsikko ja ingressi: ydinlupaus
2. Faktataulukko ostajalle: kapasiteetit (majoitus / kokous), huoneet ja kylpyhuoneet, kokoustilan varustus (videotykki, valkokangas, erillinen näyttö, nopea mobiililaajakaista, hyvät 4G- ja 5G-yhteydet, ei fläppitaulua ennen C6:n vastausta), etäisyydet, saunat, pysäköinti
3. Käyttötarpeet lyhyesti: strategiapäivät, tiimin offsite tai kick-off, hallituksen kokous, pienryhmän asiakas- tai kumppanitilaisuus, fasilitoitu työpaja
4. Kolme kokoonpanoa (6.2)
5. Hintaesimerkit: haetaan `quote`-kutsulla, kun sivu rakennetaan (samaan tapaan kuin `LiveRates`, revalidate 900). Erittely, hinta per henkilö per yö ja maininta "tarkista ajantasainen hinta varauskalenterista". Jos jakso on varattu (409), esimerkki jätetään pois. Hintoja ei kovakoodata.
6. Esimerkkiohjelma kahdelle päivälle kausittain (ladut / golf / ruska). Ruokailu ja ohjelmapalvelut ovat `TODO` (C7–C9).
7. Käytännön asiat: kuljetus, ruokailu, lasku yritykselle, peruutusehdot (linkki ehtoihin)
8. Usein kysytyt kysymykset (8–12 kpl): esimerkiksi oma huone (korjatulla muotoilulla), kokoustilan varustus, netti videopuheluihin, fläppitaulu, ruokailu, lentokenttäkuljetus, arkipäivät, vähimmäiskesto, lasku yritykselle, yksityisyys
9. **Esitteen latauslinkki** (vaihe 4)
10. Toimintakehotus: varauskalenteri valmiilla parametreilla (`units` ja päivät) sekä yhteydenotto

### 6.4 Tekninen toteutus

- Reitti `src/lib/routes.ts`:ään (nimi C12:n mukaan), sivut kansioihin `src/app/(fi)/…` ja `src/app/(en)/en/…`, sisältö `src/content/`-tiedostoihin samaan tapaan kuin joukkuesivulla
- Metatiedot nykyisellä `buildPageMetadata`-funktiolla (canonical, hreflang, OpenGraph, description)
- JSON-LD: `MeetingRoom` lisätään `buildLodging`-funktion `containsPlace`-listaan (`maximumAttendeeCapacity: 20`, varustus `amenityFeature`-listana), jolloin se näkyy koko sivustolla. Sivulle tulee `FAQPage` nykyisellä `buildFaqJsonLd`-funktiolla. Uutta `LodgingBusiness`-merkintää ei tehdä.
- Linkit etusivun "Ryhmille yrityksistä ystäviin" -osiosta ja joukkuesivulta, päävalikkoon C12:n mukaan
- Sivukarttaan oikealla `lastmod`-päivällä, testit (`tests/pages.test.ts`, `tests/structured-data.test.ts`)
- llms.txt: osio "For companies & leadership offsites" (3–5 riviä, linkit). llms-full.txt: oma osio, jossa on faktat, kokoonpanot, kysymykset ja ohje agentille: "Tarkista kokoustilan saatavuus `availability`-kutsulla ja hinta `quote`-kutsulla parametrilla `conference_room=true`. Älä ilmoita kokonaishintaa, jota `quote` ei ole palauttanut."

**Valmis, kun:**
- Luvut täsmäävät kohtaan 2.3 tai `quote`-vastaukseen.
- Kieliversiot vastaavat toisiaan.
- `curl -s URL | grep "<teksti>"` löytää sisällön ilman JavaScriptiä.
- validator.schema.org ei anna virheitä.

---

## 7. Vaihe 4 – Ladattava esite yrityspäättäjille ja HR:lle

**Edellyttää:** vastaukset D1–D4 ja vaiheen 3 sisällön (esite käyttää samoja tekstejä).

### 7.1 Periaatteet

- **Lataus ilman yhteystietoja:** ei lomaketta eikä sähköpostin kysymistä. Suora linkki PDF-tiedostoon.
- Muutama slide vaakasuunnassa (16:9), joka toimii sekä näytöllä että tulostettuna. Ostaja voi välittää esitteen eteenpäin johtoryhmälle sellaisenaan.
- Tekstit ovat oikeaa tekstiä eivätkä kuvia, jotta hakukoneet ja tekoälyavustajat pystyvät lukemaan ne.
- Pysyvät osoitteet, jotta linkit ja QR-koodit eivät vanhene: `/esite/hiihtogreeni-yritysryhmat.pdf` ja `/en/brochure/hiihtogreeni-companies.pdf`. Päivitysajankohta näkyy esitteen alatunnisteessa.

### 7.2 Sisältö (7–8 slidea)

| # | Slide | Sisältö |
|---|---|---|
| 1 | Kansi | "Koko talo johtoryhmälle Levillä", pääkuva, lyhyt ydinlupaus |
| 2 | Miksi Hiihtogreeni | yksityisyys, kokoustila saman katon alla, oma kylpyhuone jokaisessa makuuhuoneessa, saunat, 20 min lentokentältä |
| 3 | Tilat faktoina | kapasiteetit, kokoustilan varustus (C3–C6), yhteydet, pysäköinti, pohjakuva tai tilakaavio, jos sellainen on |
| 4 | Käyttötarpeet | strategiapäivät, tiimin offsite tai kick-off, hallituksen kokous, pienryhmän asiakas- tai kumppanitilaisuus, fasilitoitu työpaja: kustakin yksi lause ja sopiva kokoonpano |
| 5 | Esimerkkiohjelmat | 2 päivän strategiapäivät toukokuussa, 3 päivän ruska-offsite ja talven kick-off. Ruokailu ja ohjelma `TODO`, kunnes kumppanit on vahvistettu (C7–C9). |
| 6 | Kokoonpanot ja hinnat | kolme kokoonpanoa (6.2) ja hintaesimerkit, joissa näkyy laskentapäivä (D2) |
| 7 | Käytännön asiat | kuljetus, ruokailu, lasku yritykselle, peruutusehdot (C8, C10, C11) |
| 8 | Näin varaat | QR-koodi varauskalenteriin, yhteystiedot, ja maininta, että saatavuuden voi tarkistaa myös tekoälyavustajalla |

### 7.3 Tekninen toteutus (vaihtoehto D1a)

- Esite on printtisivu repossa, joka käyttää samoja `src/content`-tekstejä ja sivuston tyylejä. Skripti (esim. `scripts/build-brochure.ts`) tulostaa sen PDF:ksi headless Chromiumilla ja tallentaa `public/`-kansioon. Hintaesimerkit haetaan `quote`-kutsulla skriptin ajohetkellä, ja laskentapäivä tulee esitteeseen.
- Esite päivitetään ajamalla skripti uudelleen, kun faktat tai hinnat muuttuvat, ja vähintään kauden vaihtuessa.
- PDF-metatiedot: otsikko, kieli ja tekijä (Levin Hiihtogreeni Oy). Koko alle 5 Mt.
- HTTP-otsake `Link: <yrityssivun osoite>; rel="canonical"` PDF:lle (`next.config.ts`), jotta hakukone ohjaa yrityssivulle eikä näytä PDF:ää sen sijaan.
- QR-koodin ja linkkien UTM-tunnisteet: `utm_source=esite&utm_medium=pdf&utm_campaign=yritysryhmat`
- Latauslinkit: yrityssivu (kaksi kohtaa: faktataulukon jälkeen ja lopussa), etusivun "Ryhmille"-osio, llms.txt ja llms-full.txt sekä vaiheen 6 luonnokset
- Mittaus: Umami-tapahtuma `brochure_download` (vain kieli, ei henkilötietoja). GA4:ään sama tapahtuma vain suostumuksella.

**Valmis, kun:**
- PDF avautuu ilman lomaketta.
- Teksti on valittavissa.
- Luvut täsmäävät yrityssivun kanssa.
- QR-koodi vie varauskalenteriin UTM-tunnisteiden kanssa.
- Lataus näkyy Umamissa.

---

## 8. Vaihe 5 – API- ja MCP-kuvaukset (levifinland2026)

**Vain tekstimuutoksia.** Rajapinnan toiminta, parametrit ja vastausten rakenne pysyvät ennallaan, lukuun ottamatta vaihetta 2.

- `get_availability`, `get_quote` ja `submit_booking_request` (sekä vastaavat OpenAPI-operaatiot): lisätään käyttötapaus "Käytä myös yritysryhmien kokous- ja strategiapäiväkyselyihin. Kokoustila (20 hlö) varataan parametrilla `conference_room`, ja se on maksuton koko talon varauksissa."
- MCP-palvelimen `instructions` ja OpenAPI-kuvauksen `info.description`: maininta yrityskäytöstä ja linkki yrityssivulle
- Kenttä `source` pysyy ennallaan (agentin tai sovelluksen nimi). Sitä ei käytetä kysymykseen "Mistä löysit meidät?".
- Tiedostot: `packages/db/src/hiihtogreeni/openapi.ts` ja `apps/cabin/src/lib/hiihtogreeni-mcp.ts`

---

## 9. Vaihe 6 – Ulkoiset luonnokset

Tiedosto `docs/geo/ulkoiset-luonnokset.md`. Kaikki vastaanottajat ja palvelut merkitään "selvitettävä", kunnes omistaja on vahvistanut ne.

1. **Levin matkailuorganisaatio:** pyyntö listauksesta yritys- ja kokoussivulle, kuvaus noin 80 sanalla ja faktalista. Vastaanottajan osoite selvitettävä.
2. **Visit Finland Datahub:** kuvaus noin 150 sanalla fi ja en sekä kategoriaehdotus. Rekisteröitymisen vaatimukset selvitettävä.
3. **Kokouspaikkapalvelut:** yleinen listausteksti fi ja en sekä lista selvitettävistä palveluista
4. **Ohjelmapalveluyritykset ja DMC:t:** lyhyt yhteistyöehdotus 8–20 hengen ryhmille
5. **Fasilitaattorit ja konsultit:** yhteistyöehdotus ja oma UTM-linkki kumppanille
6. **Google Business Profile:** kuvaus, kategoria- ja määrite-ehdotukset sekä kuvalista
7. **Asiakastarinan pohja** (C13): kysymykset asiakkaalle, noin 300 sanan rakenne ja LinkedIn-luonnos. Julkaistaan vain asiakkaan hyväksynnällä, eikä lainauksia keksitä.

Kaikkiin luonnoksiin tulee esitteen latauslinkki ja UTM-tunnisteet (`utm_medium=referral`, `utm_campaign=yritysryhmat`).

---

## 10. Vaihe 7 – Mittaus

- **Ensisijainen mittari on Umami** (evästeetön, näkee kaiken liikenteen): lähteet `chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com` ja `copilot.microsoft.com`, yrityssivun käynnit, `brochure_download`, `book_cta_click` ja `inquiry_submitted`. GA4 on toissijainen, koska se toimii vain suostumuksella.
- **Testikysymykset** (E1): 10 kysymystä suomeksi ja 10 englanniksi, esimerkiksi "johtoryhmän strategiapäivät Lapissa", "kokoustila ja majoitus samassa paikassa Levillä", "leadership offsite Lapland" ja "exclusive use venue Finnish Lapland". Ne lisätään 10.12. katselmoinnin kiinteiden kysymysten joukkoon ja kirjataan samaan muotoon: päivämäärä, palvelu, kieli, kysymys, mainittiinko Hiihtogreeni, muut mainitut kohteet, lähteet ja oliko hinta oikein.
- **Kuukausirutiini:** kysymykset uudestaan ja vertailu edelliseen kuukauteen. Omistaja ajaa kysymykset itse.
- "Mistä löysit meidät?" -kenttä yhteydenottolomakkeeseen E2:n mukaan

---

## 11. Omistajan omat tehtävät

- Vastaukset kohtaan 1
- Valokuvat: kokoustila työpajakäytössä (videotykki päällä, pöydät järjestettynä), illan tunnelma ja sauna
- Verkon nopeusmittaus kokoustilassa (C5)
- Testikysymysten ajaminen ennen julkaisua ja kuukausittain
- Ulkoisten luonnosten lähettäminen ja listausten rekisteröinti
- Google Business Profilen päivitys

---

## 12. Järjestys ja riippuvuudet

| Vaihe | Repo | Edellyttää | Arvio |
|---|---|---|---|
| 1 Pikakorjaukset | hiihtogreeni | A1–A4 (1.4–1.6 heti) | 2–3 h |
| 2 Vahvistuslinkki | levifinland2026 | B1–B3 | 1 päivä |
| 3 Yrityssivu | hiihtogreeni (+ levifinland2026, jos C1 muuttaa vähimmäiskestoa) | C1, C2, C12; julkaisu C3–C5 | 1–2 päivää |
| 4 Esite | hiihtogreeni | D1–D4, vaihe 3 | 1 päivä |
| 5 API- ja MCP-kuvaukset | levifinland2026 | vaihe 3 julkaistu | 1–2 h |
| 6 Ulkoiset luonnokset | hiihtogreeni (docs) | vaiheet 3 ja 4 | 2–3 h |
| 7 Mittaus | hiihtogreeni | E1, E2 | 1–2 h |

Vaiheet 1 ja 2 ovat toisistaan riippumattomia ja voidaan tehdä rinnakkain. Vaiheet 3 → 4 → 6 tehdään järjestyksessä.

---

## 13. Valmis, kun

- [ ] Äkkilähtö, suksihuoltotila, ALV ja sähköauton lataus kerrotaan yhtenäisesti kaikkialla
- [ ] robots.txt ilman `Disallow`-rivejä 410-poluille, MCP-linkki alatunnisteessa, sivukartan päivämäärät oikein
- [ ] API:n ja MCP:n kautta tulevat varauspyynnöt lukitsevat päivät vasta vahvistuksen jälkeen
- [ ] Yrityssivu fi ja en julkaistu, linkitetty ja sivukartassa, `MeetingRoom` ja `FAQPage` validoitu
- [ ] Esite fi ja en ladattavissa ilman yhteystietoja, lataus mitataan
- [ ] llms-tiedostot sekä API- ja MCP-kuvaukset mainitsevat yrityskäytön
- [ ] `docs/geo/`: ulkoiset luonnokset ja testikysymykset katselmoinnin listassa
- [ ] Jäljelle jääneet `TODO(omistaja)`-kohdat listattu loppuraporttiin
