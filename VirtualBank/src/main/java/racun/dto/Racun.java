package racun.dto;

import java.io.Serializable;

public class Racun implements Serializable{

	String brojKartice ="";
	String ime;
	String prezime;
	String tipKartice;
	String datumIsticanjaKartice;
	String pin;
	int stanjeRacuna;
	char onlineKupovina;
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Racun() {
	}
	
	

	public Racun(String brojKartice, String ime, String prezime, String tipKartice, String datumIsticanjaKartice,
			String pin, int stanjeRacuna, char onlineKupovina) {
		super();
		this.brojKartice = brojKartice;
		this.ime = ime;
		this.prezime = prezime;
		this.tipKartice = tipKartice;
		this.datumIsticanjaKartice = datumIsticanjaKartice;
		this.pin = pin;
		this.stanjeRacuna = stanjeRacuna;
		this.onlineKupovina = onlineKupovina;
	}



	public String getBrojKartice() {
		return brojKartice;
	}

	public void setBrojKartice(String brojKartice) {
		this.brojKartice = brojKartice;
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

	public String getTipKartice() {
		return tipKartice;
	}

	public void setTipKartice(String tipKartice) {
		this.tipKartice = tipKartice;
	}

	public String getDatumIsticanjaKartice() {
		return datumIsticanjaKartice;
	}

	public void setDatumIsticanjaKartice(String datumIsticanjaKartice) {
		this.datumIsticanjaKartice = datumIsticanjaKartice;
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	public int getStanjeRacuna() {
		return stanjeRacuna;
	}

	public void setStanjeRacuna(int stanjeRacuna) {
		this.stanjeRacuna = stanjeRacuna;
	}

	public char getOnlineKupovina() {
		return onlineKupovina;
	}

	public void setOnlineKupovina(char onlineKupovina) {
		this.onlineKupovina = onlineKupovina;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	

}
