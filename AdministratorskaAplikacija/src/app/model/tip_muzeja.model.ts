export interface IJsonResponseTipMuzeja {
    idTipa: number | null;
    tip: string | null;

}
export class TipMuzeja implements IJsonResponseTipMuzeja {
    idTipa: number | null;
    tip: string | null;

    constructor(idTipa?: number, tip?: string) {
        this.idTipa = idTipa || null;
        this.tip = tip || null;
        
    }


}