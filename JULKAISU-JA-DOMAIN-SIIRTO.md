# Hiihtogreeni: julkaisu, domain-siirto ja jälkiseuranta

Tämä ohje kokoaa jäljellä olevat vaiheet WordPress-sivuston vaihtamiseksi Vercelissä toimivaan Next.js-sivustoon. Tärkein periaate on, että domainin rekisteröijän vaihto, DNS-muutos, verkkosivuston julkaisu ja sähköpostin mahdollinen siirto ovat eri toimenpiteitä.

Niitä ei suositella tehtäväksi samanaikaisesti. Pienimmän riskin vaihtoehto on julkaista sivusto ensin nykyisen DNS-hallinnan kautta ja siirtää domain uuden webhotellin hallintaan vasta, kun sivusto ja sähköposti ovat toimineet vakaasti.

## Nykytila 20.7.2026

Nykyisestä julkisesta DNS:stä havaittiin seuraavat tiedot:

```text
Nimipalvelimet:
x.ns.joker.com
y.ns.joker.com
z.ns.joker.com

Verkkosivuston apex-tietue:
hiihtogreeni.fi → 93.90.59.253

WWW:
www.hiihtogreeni.fi → cp.arti.fi

Sähköposti:
MX 20 mail.arti.fi

SPF:
v=spf1 include:arti.fi ~all
```

Julkinen tarkistus ei kerro varmasti kaikkia tarvittavia DNS-tietueita. Erityisesti DKIM-tietueita ei voi löytää ilman käytössä olevan selectorin nimeä. Nykyisestä DNS-hallinnasta pitää siksi ottaa täydellinen tietuelista tai zone-export ennen nimipalvelimien vaihtamista.

## Päätös ennen muutoksia

Valitse toinen seuraavista tavoista.

### Vaihtoehto A: suositeltu ja vähäriskisin

- [ ] Säilytä domain ja nimipalvelimet nykyisessä hallinnassa julkaisun ajan.
- [ ] Lisää domainit Verceliin.
- [ ] Muuta nykyisessä DNS-hallinnassa vain verkkosivuston apex- ja `www`-tietueet Vercelin antamiin arvoihin.
- [ ] Älä muuta sähköpostin MX-, SPF-, DKIM- tai muita sähköpostitietueita.
- [ ] Siirrä domain uuteen webhotelliin myöhemmin erillisenä muutoksena.

### Vaihtoehto B: domain siirretään ennen julkaisua

- [ ] Pyydä Artilta `.fi`-domainin siirtoavain.
- [ ] Varmista kirjallisesti, ettei siirto katkaise nykyistä sähköpostipalvelua.
- [ ] Siirrä domain uuteen webhotelliin ilman nimipalvelimien vaihtoa, jos mahdollista.
- [ ] Jos nimipalvelimet vaihtuvat, kopioi täydellinen DNS-zone uuteen palveluun ennen muutosta.
- [ ] Varmista sähköpostin toiminta domain-siirron jälkeen ennen verkkosivuston DNS-muutosta.

### Vaihtoehto C: Cloudflare + Vercel + Purelymail

Tämä on valittu toteutustapa: domain rekisteröidään Domainhotellille, DNS siirretään Cloudflareen, verkkosivusto Verceliin ja sähköposti Purelymailiin. Verkkosivuston ja sähköpostin lyhyt katko (muutamasta tunnista vuorokauteen) hyväksytään, joten nimipalvelinvaihto tehdään yhtenä kertana.

Vaiheet 1–4 eivät vaikuta tuotantoon, joten ne voi tehdä rauhassa etukäteen. Vaiheet 5–7 ovat varsinainen vaihto.

- [x] **1. Purelymail:** luo tili, lisää `hiihtogreeni.fi`, luo postilaatikko `hiihtogreeni@hiihtogreeni.fi` ja tallenna sen antamat MX-, SPF-, DKIM- ja DMARC-arvot. Älä muuta DNS:ää vielä.
- [x] **2. Vercel:** lisää projektiin `hiihtogreeni.fi` ja `www.hiihtogreeni.fi`, aseta `www` ensisijaiseksi production-domainiksi ja apex ohjautumaan `www`-domainiin. Tallenna Vercelin näyttämät A- ja CNAME-arvot.
- [x] **3. Cloudflare:** luo tili, lisää sivusto `hiihtogreeni.fi` ja tallenna Cloudflaren antamat kaksi nimipalvelinta.
- [x] **4. Cloudflare-tietueet valmiiksi ennen julkaisua:**
  - [x] apex `hiihtogreeni.fi` → Vercelin arvo, **vain DNS (harmaa pilvi)**
  - [x] `www` → `cname.vercel-dns.com`, **vain DNS (harmaa pilvi)**
  - [x] Purelymailin MX-, SPF-, DKIM- ja DMARC-tietueet vaiheesta 1
- [x] **5. Domain Domainhotellille:** pyydä Artilta `.fi`-siirtoavain (Luonnos 2) ja käynnistä siirto/rekisteröinti Domainhotellilla.
- [x] **6. DNSSEC pois:** varmista, että DNSSEC on kytketty pois nykyisen rekisteröijän/Jokerin puolella ennen nimipalvelinvaihtoa. Tämä on ainoa asia, joka voi kaataa `.fi`-domainin kokonaan vaihdon aikana.
- [x] **7. Nimipalvelimet Cloudflareen:** aseta Domainhotellilla domainin nimipalvelimiksi vaiheen 3 kaksi Cloudflare-osoitetta. Tämä on ainoa katkoshetki, jossa verkkosivusto ja sähköposti vaihtuvat yhtä aikaa.
- [x] **8. Odota aktivoitumista:** Cloudflare näyttää zonen tilaksi "Active" ja Vercel näyttää molemmat domainit kunnossa TLS-sertifikaatin kanssa.
- [x] **9. Varmista sivusto ja sähköposti:** aja Vaihe 11:n tarkistuslista (apex→www-ohjaus, kymmenen sivua palauttaa `200`, sitemap/robots, yhteydenottolomake). Lähetä testiviesti molempiin suuntiin ja varmista, että SPF, DKIM ja DMARC menevät läpi (esim. mail-tester.com).
- [ ] **10. Viimeistely (vakautumisen jälkeen):** ota tarvittaessa DNSSEC uudelleen käyttöön (Cloudflare luo DS-tietueen → lisää se Domainhotellilla), irtisano vanhat Artin verkkosivusto- ja sähköpostipalvelut (Luonnos 4) ja säilytä vanha WordPress-varmuuskopio, kunnes toiminta on varmistettu.

Huomioitavaa:

- **Sähköpostihistoria:** Purelymail aloitetaan tyhjänä, joten vanhat viestit eivät siirry automaattisesti. Jos vanha postilaatikko halutaan säilyttää, tee IMAP-siirto ennen vaihetta 10 tai pidä vanha tili luettavana vielä hetki.
- **Cloudflaren proxy:** pidä Vercel-tietueet tilassa "vain DNS" (harmaa pilvi). Proxy (oranssi pilvi) aiheuttaa Vercelin kanssa TLS- ja ohjaussilmukkaongelmia.

## Vaihe 10: valmistelu ennen julkaisua

### Domain ja sähköposti

- [x] Päätä, jääkö `hiihtogreeni@hiihtogreeni.fi` Artin sähköpostipalveluun vai siirtyykö se uuteen webhotelliin.
- [ ] Pyydä Artilta täydellinen DNS-tietuelista tai zone-export.
- [ ] Selvitä kaikki käytössä olevat sähköpostilaatikot, aliakset, edelleenlähetykset ja DKIM-tietueet.
- [x] Varmista, että sähköpostin MX- ja SPF-tietueiden lisäksi kaikki DKIM-, DMARC- ja palvelun vahvistustietueet säilyvät.
- [ ] Älä irtisano Artin palvelua ennen kuin sivusto ja sähköposti on todettu vakaiksi.

### Varmuuskopio ja palautus

- [ ] Ota WordPress-tietokannasta varmuuskopio.
- [ ] Ota `wp-content/uploads`-hakemistosta varmuuskopio.
- [ ] Tallenna WordPressin ja PHP:n versiot sekä nykyinen palvelimen IP-osoite.
- [ ] Tallenna täydellinen DNS-zone ja nykyiset nimipalvelimet.
- [ ] Jäädytä WordPressin sisältömuutokset juuri ennen julkaisua.
- [ ] Pidä vanha WordPress palautettavissa vähintään 1–2 viikon ajan.
- [ ] Sovi, kuka tekee palautuksen ja mistä DNS-tietueet palautetaan.

### DNS:n valmistelu

- [ ] Laske verkkosivuston DNS-tietueiden TTL esimerkiksi 300 sekuntiin hyvissä ajoin ennen julkaisua.
- [ ] Älä muuta sähköpostitietueiden TTL:ää tai sisältöä ilman erillistä tarvetta.
- [x] Lisää Vercel-projektiin `www.hiihtogreeni.fi` ja `hiihtogreeni.fi`.
- [x] Aseta `www.hiihtogreeni.fi` Vercelin ensisijaiseksi production-domainiksi.
- [x] Aseta apex-domain `hiihtogreeni.fi` ohjautumaan `www`-domainiin.
- [x] Käytä aina Vercelin projektinäkymässä juuri tälle projektille näyttämiä A- ja CNAME-arvoja.

## Vaihe 11: tuotantojulkaisu

### Ennen DNS-muutosta

- [x] Tarkista, että viimeisin GitHub-commit on julkaistu onnistuneesti Verceliin.
- [x] Tarkista Vercelin production-ympäristömuuttujat, erityisesti `RESEND_API_KEY`.
- [ ] Testaa yhteydenottolomake vielä staging-domainissa.
- [ ] Tallenna julkaisun aloitusaika ja nykyiset DNS-arvot palautusta varten.
- [ ] Tee muutos vähäisen liikenteen aikaan.

### DNS-muutos

- [x] Korvaa nykyinen apex-tietue `hiihtogreeni.fi → 93.90.59.253` Vercelin näyttämällä tietueella.
- [x] Korvaa nykyinen `www.hiihtogreeni.fi → cp.arti.fi` Vercelin näyttämällä tietueella.
- [ ] Jätä MX-, SPF-, DKIM-, DMARC- ja muut sähköpostitietueet ennalleen.
- [x] Odota, että Vercel ilmoittaa molempien domainien asetusten olevan kunnossa.
- [x] Varmista, että Vercel on myöntänyt TLS-sertifikaatin sekä apex- että `www`-domainille.

### Välittömät tarkistukset

- [x] `http://hiihtogreeni.fi/` ohjautuu osoitteeseen `https://www.hiihtogreeni.fi/`.
- [x] `https://hiihtogreeni.fi/` ohjautuu osoitteeseen `https://www.hiihtogreeni.fi/`.
- [x] Kaikki kymmenen FI/EN-sivua palauttavat HTTP `200` oikeassa trailing-slash-osoitteessa.
- [x] `/en/gallery/` ohjautuu pysyvästi osoitteeseen `/en/photo-gallery/`.
- [x] `/en/` ohjautuu pysyvästi osoitteeseen `/en/home/`.
- [x] `/wp-sitemap.xml` ohjautuu osoitteeseen `/sitemap.xml`.
- [x] `/sitemap.xml` ja `/robots.txt` palauttavat HTTP `200`.
- [x] Canonical- ja hreflang-osoitteet käyttävät `https://www.hiihtogreeni.fi`-domainia.
- [x] Tuotantosivuilla ei ole `noindex`-meta-arvoa tai `X-Robots-Tag: noindex` -otsaketta.
- [x] Tuntematon osoite palauttaa oikean HTTP `404` -vastauksen.
- [x] Kuvat, vanhat `/wp-content/uploads/`-osoitteet ja varausehtojen PDF toimivat.
- [x] Yhteydenottolomake toimittaa viestin yritykselle.
- [x] Asiakas saa vahvistusviestin.
- [x] Viestiin vastaaminen menee oikeaan osoitteeseen.
- [x] Tavallinen saapuva ja lähtevä sähköposti toimii edelleen osoitteella `hiihtogreeni@hiihtogreeni.fi`.

### Palautuskriteerit

Palauta DNS WordPress-palvelimelle välittömästi, jos jokin seuraavista toteutuu eikä sitä voi korjata nopeasti:

- yksikin tärkeä sivu palauttaa `5xx`- tai `404`-vastauksen
- koko sivustolla näkyy `noindex` tai väärä canonical-domain
- tärkeä ohjaus muodostaa silmukan
- kuvat tai olennainen sisältö puuttuvat usealta sivulta
- yhteydenottolomake ei toimita viestejä eikä toimivaa yhteydenottovaihtoehtoa ole
- sähköposti lakkaa vastaanottamasta viestejä

Palautus tehdään vaihtamalla apex- ja `www`-tietueet takaisin tässä dokumentissa tallennettuihin vanhoihin arvoihin. Sähköpostitietueita ei muuteta palautuksen yhteydessä.

## Vaihe 12: julkaisun jälkiseuranta

### Ensimmäiset 72 tuntia

- [ ] Tarkista sivuston toiminta ja yhteydenottolomakkeen toimitukset useita kertoja päivässä.
- [ ] Tarkista Vercelin virhelokit.
- [ ] Tarkista sähköpostin saapuminen, lähettäminen ja roskapostikansiot.
- [ ] Tarkista tärkeimmät sivut mobiilissa ja tietokoneella.
- [ ] Tee uusi sivustocrawl 24 tunnin kuluttua.
- [ ] Älä irtisano WordPress- tai sähköpostipalvelua.

### Hakukoneet

- [x] Lähetä `https://www.hiihtogreeni.fi/sitemap.xml` Google Search Consoleen.
- [ ] Lähetä sama sitemap Bing Webmaster Toolsiin.
- [ ] Pyydä indeksointi etusivuille ja tärkeimmille FI/EN-sivuille.
- [ ] Seuraa päivittäin kahden viikon ajan indeksointia, canonical-valintoja, uudelleenohjauksia, 404-virheitä ja Core Web Vitals -tietoja.
- [ ] Varmista, että `/en/gallery/` poistuu vähitellen ja `/en/photo-gallery/` jää indeksiin.
- [ ] Tee uudet crawlit 7, 30 ja 90 päivän kohdalla.

### Vakiintumisen jälkeen

- [ ] Nosta verkkosivuston DNS-tietueiden TTL takaisin normaaliin arvoon.
- [ ] Säilytä pysyvät uudelleenohjaukset toistaiseksi.
- [ ] Arkistoi WordPress turvallisesti vasta vakausjakson jälkeen.
- [ ] Siirrä domain uuteen webhotelliin erillisenä muutoksena, jos se jätettiin julkaisun ajaksi nykyiseen hallintaan.
- [ ] Irtisano vanha palvelu vasta, kun on varmistettu, ettei siinä ole enää käytössä verkkosivustoa, sähköpostia, DNS:ää tai muuta tarpeellista palvelua.

## Vaihe 13: myöhemmät parannukset

- [ ] Lisää erikseen toimitettava evästesuostumusratkaisu.
- [ ] Lisää GA4 vasta evästesuostumuksen jälkeen.
- [ ] Testaa, ettei analytiikka lataudu ennen hyväksyttyä suostumusta.
- [ ] Lisää tarvittaessa varaus- ja markkinointimittaus ilman henkilötietojen lähettämistä analytiikkaan.
- [ ] Tee laajemmat sisältö- ja markkinointimuutokset vasta, kun SEO-migraation perustaso on vakaa.

# Sähköpostiluonnokset Artille

Täydennä hakasulkeissa olevat tiedot ennen lähettämistä.

## Luonnos 1: nykyisten palvelujen ja DNS-tietojen selvitys

**Aihe:** Hiihtogreeni.fi – nykyiset palvelut ja DNS-tietueet

Hei,

olemme uudistamassa hiihtogreeni.fi-verkkosivustoa ja valmistelemme hallittua siirtymistä uuteen julkaisuympäristöön. Tässä vaiheessa emme vielä irtisano mitään palvelua emmekä halua tehdä muutoksia sähköpostiin.

Voisitteko toimittaa meille seuraavat tiedot:

1. Mitkä palvelut hiihtogreeni.fi-domainille ovat tällä hetkellä käytössä ja laskutuksessa (domain, DNS, webhotelli, WordPress, sähköposti ja mahdolliset muut palvelut)?
2. Täydellinen nykyinen DNS-tietuelista tai zone-export, mukaan lukien A-, AAAA-, CNAME-, MX-, TXT-, SPF-, DKIM-, DMARC- ja mahdolliset vahvistustietueet.
3. Mitkä sähköpostilaatikot, aliakset ja edelleenlähetykset domainilla ovat käytössä?
4. Voiko sähköpostipalvelu jatkua normaalisti, jos verkkosivuston apex- ja www-tietueet myöhemmin osoitetaan Verceliin?
5. Voiko domainin siirtää toiselle välittäjälle siten, että nykyiset nimipalvelimet ja sähköpostipalvelu jäävät ensin ennalleen?

Pyydämme, ettei mihinkään palveluun tai DNS-tietueeseen tehdä vielä muutoksia vastauksenne yhteydessä.

Ystävällisin terveisin,

[Nimi]
[Yritys]
[Puhelinnumero]

## Luonnos 2: siirtoavaimen pyyntö

**Aihe:** Hiihtogreeni.fi – .fi-domainin siirtoavain

Hei,

pyydän hiihtogreeni.fi-domainin voimassa olevan siirtoavaimen, jotta domainin välittäjähallinta voidaan siirtää uuteen webhotelliin.

Tämä pyyntö ei ole palvelujen irtisanominen. Pyydämme, että nykyinen DNS, WordPress-hosting ja erityisesti sähköpostipalvelu säilyvät ennallaan, kunnes ilmoitamme erikseen muutoksista tai irtisanomisesta.

Vahvistattehan samalla:

1. muuttaako domain-siirto automaattisesti nimipalvelimia
2. voiko nykyinen sähköpostipalvelu `mail.arti.fi` jatkua domain-siirron jälkeen
3. mitä Artin DNS- ja sähköpostipalveluille tapahtuu, jos domainin välittäjä vaihtuu mutta palveluja ei irtisanota
4. onko siirtoavaimella voimassaoloaikaa tai muuta huomioitavaa

Ystävällisin terveisin,

[Nimi]
[Yritys]
[Puhelinnumero]

## Luonnos 3: verkkosivuston DNS-muutoksen koordinointi

**Aihe:** Hiihtogreeni.fi – verkkosivuston DNS-muutos Verceliin

Hei,

olemme julkaisemassa uuden hiihtogreeni.fi-verkkosivuston Vercelissä. Tarkoitus on muuttaa vain verkkosivuston apex- ja www-tietueet. Nykyisen sähköpostipalvelun pitää jatkua keskeytyksettä.

Pyydämme vahvistamaan ennen muutosta, että seuraavat sähköpostiin liittyvät tiedot säilyvät ennallaan:

- MX `20 mail.arti.fi`
- SPF `v=spf1 include:arti.fi ~all`
- kaikki käytössä olevat DKIM-, DMARC-, alias- ja muut sähköpostin vaatimat tiedot

Vercel antaa meille uudet arvot seuraaville tietueille:

- `hiihtogreeni.fi` / apex: [VERCELIN ANTAMA ARVO]
- `www.hiihtogreeni.fi`: [VERCELIN ANTAMA ARVO]

Suunniteltu muutosaika on [PÄIVÄ JA KELLONAIKA]. Pyydämme, ettei muita DNS- tai palvelumuutoksia tehdä samalla.

Vahvistattehan, voimmeko tehdä nämä kaksi verkkosivustotietueen muutosta ilman vaikutusta nykyiseen sähköpostiin ja tarvitaanko teiltä jokin erillinen toimenpide.

Ystävällisin terveisin,

[Nimi]
[Yritys]
[Puhelinnumero]

## Luonnos 4: vanhan webhotellin myöhempi irtisanominen

Lähetä tämä vasta vakausjakson jälkeen ja vasta, kun sähköpostin jatko on varmasti ratkaistu.

**Aihe:** Hiihtogreeni.fi – vanhan verkkosivustopalvelun irtisanominen

Hei,

hiihtogreeni.fi-verkkosivusto on siirretty uuteen palveluun ja se on toiminut vakaasti [AIKAJAKSO]-ajan. Haluamme nyt irtisanoa ainoastaan vanhan WordPress-/webhotellipalvelun seuraavasti:

- irtisanottava palvelu: [PALVELUN TARKKA NIMI]
- toivottu päättymispäivä: [PÄIVÄMÄÄRÄ]

Älkää irtisanoko domainia, DNS-palvelua tai sähköpostipalvelua tämän viestin perusteella, ellei niitä ole lueteltu yllä erikseen. Osoitteen `hiihtogreeni@hiihtogreeni.fi` ja muiden sähköpostitoimintojen pitää jatkua normaalisti.

Vahvistattehan kirjallisesti, mitä palvelua irtisanominen koskee, mitä palveluja jää voimaan ja mikä on lopullinen päättymispäivä.

Ystävällisin terveisin,

[Nimi]
[Yritys]
[Puhelinnumero]

## Julkaisun lopullinen hyväksyntä

Julkaisu katsotaan onnistuneeksi, kun:

- [x] kaikki kymmenen canonical-sivua toimivat tuotantodomainissa
- [x] apex, HTTP ja vanhat tunnetut polut ohjautuvat oikein
- [x] sitemap, robots, canonical ja hreflang ovat oikein
- [x] sivustolla ei ole tuotannon `noindex`-virhettä
- [x] kuvat, PDF ja yhteydenottolomake toimivat
- [x] yrityksen sähköposti vastaanottaa ja lähettää normaalisti
- [x] Search Console hyväksyy sitemapin
- [ ] palautusreitti vanhaan WordPressiin on säilytetty vakausjakson ajaksi
