export interface IJsonResponseUplanica {
    ime: String | null;
    prezime: string | null;
    brojKartice: string | null;
    tipKartice: string | null;
    datumIsticanja: string | null;
    pin: string | null;
    iznosUplate: number | null;
    idvirtuelnaposjeta: number | null;

}
export class Uplatnica implements IJsonResponseUplanica {
    ime: String | null;
    prezime: string | null;
    brojKartice: string | null;
    tipKartice: string | null;
    datumIsticanja: string | null;
    pin: string | null;
    iznosUplate: number | null;
    idvirtuelnaposjeta: number | null;

    constructor(ime?: String,prezime?: string,
        brojKartice?: string,
        tipKartice?: string,
        datumIsticanja?: string,
        pin?: string, iznosUplate?: number, idvirtuelnaposjeta?: number) {
        this.ime = ime || null;
        this.prezime = prezime || null;
        this.tipKartice = tipKartice || null;
        this.datumIsticanja = datumIsticanja || null;
        this.brojKartice = brojKartice || null;
        this.pin = pin || null;
        this.iznosUplate = iznosUplate || null;
        this.idvirtuelnaposjeta=idvirtuelnaposjeta || null;
    }


}