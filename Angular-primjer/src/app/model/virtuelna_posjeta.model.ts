import { Time } from "@angular/common";
import { Muzej } from "./muzej.model";

export interface IJsonResponsePosjeta {
    idvirtuelnaposjeta: number | null;
    datum: Date | null;
    vrijemePocetka: Time | null;
    trajanje: number | null;
    idMuzej: any | null;
    cijena: number | null;

}
export class VirtuelnaPosjeta implements IJsonResponsePosjeta {
    idvirtuelnaposjeta: number | null;
    datum: Date | null;
    vrijemePocetka: Time | null;
    trajanje: number | null;
    idMuzej: any | null;
    cijena: number | null;

    constructor(idvirtuelnaposjeta?: number,datum?: Date,vrijemePocetka?: Time,trajanje?: number,idMuzej?: any,cijena?:number) {
        this.vrijemePocetka = vrijemePocetka || null;
        this.idvirtuelnaposjeta = idvirtuelnaposjeta || null;
        this.datum = datum || null;
        this.trajanje = trajanje || null;
        this.idMuzej = idMuzej || null;
        this.cijena = cijena || null;
    }


}