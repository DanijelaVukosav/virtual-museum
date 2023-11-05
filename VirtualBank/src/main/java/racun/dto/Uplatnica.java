package racun.dto;

import java.io.Serializable;

public class Uplatnica implements Serializable {
	String ime;
	String prezime;
	String brojKartice;
	String tipKartice;
	String datumIsticanja;
	String pin;
	int iznosUplate;
	int idvirtuelnaposjeta;
	

	public Uplatnica() {
		// TODO Auto-generated constructor stub
	}


	public Uplatnica(String ime, String prezime, String brojKartice, String tipKartice, String datumIsticanja,
			String pin,int iznosUplate,int idvirtuelnaposjeta) {
		super();
		this.ime = ime;
		this.prezime = prezime;
		this.brojKartice = brojKartice;
		this.tipKartice = tipKartice;
		this.datumIsticanja = datumIsticanja;
		this.pin = pin;
		this.iznosUplate=iznosUplate;
		this.idvirtuelnaposjeta=idvirtuelnaposjeta;
	}


	public int getIdvirtuelnaposjeta() {
		return idvirtuelnaposjeta;
	}


	public void setIdvirtuelnaposjeta(int idvirtuelnaposjeta) {
		this.idvirtuelnaposjeta = idvirtuelnaposjeta;
	}


	public String getIme() {
		return ime;
	}


	public void setIme(String ime) {
		this.ime = ime;
	}


	public String getPrezime() {
		return prezime;
	}


	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}


	public String getBrojKartice() {
		return brojKartice;
	}


	public void setBrojKartice(String brojKartice) {
		this.brojKartice = brojKartice;
	}


	public String getTipKartice() {
		return tipKartice;
	}


	public void setTipKartice(String tipKartice) {
		this.tipKartice = tipKartice;
	}


	public String getDatumIsticanja() {
		return datumIsticanja;
	}


	public void setDatumIsticanja(String datumIsticanja) {
		this.datumIsticanja = datumIsticanja;
	}


	public String getPin() {
		return pin;
	}


	public void setPin(String pin) {
		this.pin = pin;
	}


	public int getIznosUplate() {
		return iznosUplate;
	}


	public void setIznosUplate(int iznosUplate) {
		this.iznosUplate = iznosUplate;
	}
	

}
