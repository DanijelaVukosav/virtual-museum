package racun.dto;

import java.io.Serializable;
import java.lang.invoke.StringConcatFactory;
import java.sql.Date;

import javax.print.attribute.standard.DateTimeAtCompleted;

public class Transakcija implements Serializable {
	int idtransakcija;
	String brojKartice;
	int staroStanje;
	int novoStanje;
	Date vrijeme; 
	Date datumPosjete;
	String nazivMuzeja;

	public Transakcija() {
	}

	public Transakcija(int idtransakcija, String brojKartice, int staroStanje, int novoStanje, Date vrijeme,
			Date datumPosjete, String nazivMuzeja) {
		super();
		this.idtransakcija = idtransakcija;
		this.brojKartice = brojKartice;
		this.staroStanje = staroStanje;
		this.novoStanje = novoStanje;
		this.vrijeme = vrijeme;
		this.datumPosjete = datumPosjete;
		this.nazivMuzeja = nazivMuzeja;
	}

	public int getIdtransakcija() {
		return idtransakcija;
	}

	public void setIdtransakcija(int idtransakcija) {
		this.idtransakcija = idtransakcija;
	}

	public String getBrojKartice() {
		return brojKartice;
	}

	public void setBrojKartice(String brojKartice) {
		this.brojKartice = brojKartice;
	}

	public int getStaroStanje() {
		return staroStanje;
	}

	public void setStaroStanje(int staroStanje) {
		this.staroStanje = staroStanje;
	}

	public int getNovoStanje() {
		return novoStanje;
	}

	public void setNovoStanje(int novoStanje) {
		this.novoStanje = novoStanje;
	}

	public Date getVrijeme() {
		return vrijeme;
	}

	public void setVrijeme(Date vrijeme) {
		this.vrijeme = vrijeme;
	}

	public Date getDatumPosjete() {
		return datumPosjete;
	}

	public void setDatumPosjete(Date datumPosjete) {
		this.datumPosjete = datumPosjete;
	}

	public String getNazivMuzeja() {
		return nazivMuzeja;
	}

	public void setNazivMuzeja(String nazivMuzeja) {
		this.nazivMuzeja = nazivMuzeja;
	}
	

}
