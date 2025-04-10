class Henkilo {
  constructor(etunimet, sukunimi, kutsumanimi, syntymavuosi) {
    this.etunimet = etunimet;
    this.sukunimi = sukunimi;
    this.kutsumanimi = kutsumanimi;
    this.syntymavuosi = syntymavuosi;
  }
}

class Urheilija extends Henkilo {
  linkki_kuvaan;
  omapaino;
  laji;
  saavutukset;

  constructor(
    etunimet,
    sukunimi,
    kutsumanimi,
    syntymavuosi,
    linkki_kuvaan,
    omapaino,
    laji,
    saavutukset
  ) {
    super(etunimet, sukunimi, kutsumanimi, syntymavuosi);

    this.linkki_kuvaan = linkki_kuvaan;
    this.omapaino = omapaino;
    this.laji = laji;
    this.saavutukset = saavutukset;
  }
}

let uusiUrheilija = new Urheilija(
  "Iiro",
  "Kinnunen",
  "IiroK",
  new Date("1998")
);

// Kokeilu
uusiUrheilija.omapaino = 80;
uusiUrheilija.linkki_kuvaan = "https://www.google.com";
uusiUrheilija.laji = "Nukkuminen";
uusiUrheilija.saavutukset = ["2025 Kulta", "2024 Hopea"];
console.log(uusiUrheilija);
console.log(uusiUrheilija.etunimet + "n paino on " + uusiUrheilija.omapaino + "kg.")