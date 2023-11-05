export interface IJsonResponsePrezentacija {
    idvirtuelnaposjeta: number | null;
    slika1: string | null;
    slika2: string | null;
    slika3: string | null;
    slika4: string | null;
    slika5: string | null;
    slika6: string | null;
    slika7: string | null;
    slika8: string | null;
    slika9: string | null;
    slika10: string | null;
    video: string | null;

}
export class VirtuelnaPrezentacija implements IJsonResponsePrezentacija {
    idvirtuelnaposjeta: number | null;
    slika1: string | null;
    slika2: string | null;
    slika3: string | null;
    slika4: string | null;
    slika5: string | null;
    slika6: string | null;
    slika7: string | null;
    slika8: string | null;
    slika9: string | null;
    slika10: string | null;
    video: string | null;
    constructor(idvirtuelnaposjeta?: number,
        slika1?: string,
        slika2?: string,
        slika3?: string,
        slika4?: string,
        slika5?: string ,
        slika6?: string,
        slika7?: string ,
        slika8?: string,
        slika9?: string ,
        slika10?: string ,
        video?: string) {
        this.idvirtuelnaposjeta = idvirtuelnaposjeta || null;
        this.slika1 = slika1 || null;
        this.slika2 = slika2 || null;
        this.slika3 = slika3 || null;
        this.slika4 = slika4 || null;
        this.slika5 = slika5 || null;
        this.slika6 = slika6 || null;
        this.slika7 = slika7 || null;
        this.slika8 = slika8 || null;
        this.slika9 = slika9 || null;
        this.slika10 = slika10 || null;
        this.video = video || null;

        
    }


}