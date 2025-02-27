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

  constructor(etunimet, sukunimi, kutsumanimi, syntymavuosi) {
    super(etunimet, sukunimi, kutsumanimi, syntymavuosi);
  }

  get linkki_kuvaan() {
    return this.linkki_kuvaan;
  }

  set linkki_kuvaan(url) {
    this.linkki_kuvaan = url;
  }

  get omapaino() {
    return this.omapaino;
  }

  set omapaino(paino) {
    this.omapaino = paino;
  }

  get laji() {
    return this.laji;
  }

  set laji(laji) {
    this.laji = laji;
  }

  get saavutukset() {
    return this.saavutukset;
  }

  set saavutukset(saavutukset) {
    this.saavutukset = saavutukset;
  }
}

let uusiUrheilija = new Urheilija(
  "Iiro",
  "Kinnunen",
  "IiroK",
  new Date(1998, 6, 7)
);

// Kokeilu
uusiUrheilija.omapaino = 80;
uusiUrheilija.linkki_kuvaan = "https://www.google.com"
uusiUrheilija.laji = "Nukkuminen";
uusiUrheilija.saavutukset = ["2025 Kulta", "2024 Hopea"];
console.log(uusiUrheilija);
console.log(uusiUrheilija.etunimet + "n paino on " + uusiUrheilija.omapaino + "kg.")