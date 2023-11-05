export interface IJsonResponse {
    idMuzej: number | null;
    naziv: string | null;
    adresa: string | null;
    brojTelefona: string | null;
    grad: string | null;
    drzava: string | null;
    geolokacija: string | null;
    idTipa: number | null;
    longitude: any | null;
    latitude: any | null;

}
export class Muzej implements IJsonResponse {
    idMuzej: number | null;
    naziv: string | null;
    adresa: string | null;
    brojTelefona: string | null;
    grad: string | null;
    drzava: string | null;
    geolokacija: string | null;
    idTipa: number | null;
    longitude: any | null;
    latitude: any | null;

    constructor(id_muzej?: number, naziv?: string, adresa?: string, broj_telefona?: string, grad?: string, drzava?: string, geolokacija?: string,
        id_tipa?: number,longitude?:any,latitude?:any) {
        this.idMuzej = id_muzej || null;
        this.naziv = naziv || null;
        this.adresa = adresa || null;
        this.brojTelefona = broj_telefona || null;
        this.geolokacija = geolokacija || null;
        this.grad = grad || null;
        this.drzava = drzava || null;
        this.idTipa = id_tipa || null;
        this.longitude = longitude || null;
        this.latitude = latitude || null;
    }


}