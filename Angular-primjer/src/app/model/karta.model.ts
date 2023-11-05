export interface IJsonResponseKarta {
    idvirtuelnakarta: number | null;
    token: string | null;
    idvirtuelnaposjeta: number | null;

}
export class Karta implements IJsonResponseKarta {
    token: string | null;
    idvirtuelnakarta: number | null;
    idvirtuelnaposjeta: number | null;

    constructor(token?: string, idvirtuelnakarta?: number, idvirtuelnaposjeta?: number)
    {
        this.token = token || null;
        this.idvirtuelnakarta = idvirtuelnakarta || null;
        this.idvirtuelnaposjeta = idvirtuelnaposjeta || null;
    }


}