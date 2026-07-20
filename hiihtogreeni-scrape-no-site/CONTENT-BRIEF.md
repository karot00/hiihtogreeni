# Hiihtogreeni.fi - Koodausagentille

## Sisältö

Tämä arkisto sisältää hiihtogreeni.fi-sivuston tekstit ja kuvat jäsenneltynä uudelleenkoodausta varten.

### Tiedostot

**Suomenkielinen sisältö / Finnish:**
- `index.md` - Etusivu
- `mokki.md` - Mökin tiedot ja ominaisuudet
- `hinnoittelu.md` - Hinnoittelu ja hinnastot
- `kuvagalleria.md` - Kuvagalleria (suomi + bilingual-tekstit)
- `yhteystiedot.md` - Yhteystiedot ja yhteydenottolomake
- `en/index.md` - Home page (English)
- `en/cabin.md` - Cabin details
- `en/rates.md` - Pricing
- `en/gallery.md` - Photo gallery
- `en/contact.md` - Contact information

**Metatiedot:**
- `SITEMAP.md` - Sivurakenne/kartta

### Kuvat

Kaikki kuvat sijaitsevat etäpoluissa: `https://www.hiihtogreeni.fi/wp-content/uploads/...`

**HUOM:** Gallerian tiedostot ovat samat molemmilla kielillä, mutta englanninkielinen versio käyttää eri järjestystä ja joitakin eri kuvia (kesä/talvi-kartat jätetty pois englannista).

### Ulkoiset linkit

- **Green fee -varaus:** <https://greenfee.levifinland.fi>
- **Levi Finland (fi):** <https://www.levifinland.fi/fi/blog/levin-hiihtogreeni>
- **Levi Finland (en):** <https://www.levifinland.fi/en/blog/levin-hiihtogreeni>

### Koodarin muistettavat

- **Kaksi kieltä:** FI + EN, molemmilla identtinen sivurakenne
- **Yritys:** Levin Hiihtogreeni Oy, Y-tunnus 1908552-6
- **Osoite:** Puttipolku 4, 99130 LEVI
- **Mökki:** Paritalo, 2x 12 hengen huoneistoa
- **Sijainti:** Koillisrinteet + Levi Golf (~200m rinteisiin, 150m ykköstiille)
- **VAT:** Kaikki hinnat sisältävät 13,5% ALV
- **Maksuehto:** 30% varattaessa, loppu 60pv ennen majoitusta
- **Puhelin:** Karo Tammela +358 400 234711
- **Huolto:** Jens Pitkänen +358 44 345 6001, jens.pitkanen@aavalevi.fi

## Alkuperäinen tekninen stack

- WordPress + Elementor Pro
- Ei sivupohjia muuten kuin perussivut
- Sivut käsintehtyä sisältöä, ei blogia

## Uudelleenkoodausohjeet

1. Käytä semanttista HTML:ää
2. Optimoi kuvat (nykyiset ~1-2MB per jpg)
3. Lisää oikea meta/OG-data jokaiselle sivulle
4. Tee responsiiviset versiota galleriasta
5. Yhteydenottolomake: nykyinen WordPress-lomake, korvaa vastaavalla
6. Kaksikielisyys: joko URL-polku (`/en/...`) tai kielivalitsin
