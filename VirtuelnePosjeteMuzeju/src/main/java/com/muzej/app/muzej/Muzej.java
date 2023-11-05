package com.muzej.app.muzej;

import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.muzej.app.virtuelnaposjeta.VirtuelnaPosjeta;

@Entity
public class Muzej 
{
	private int idMuzej;
	private String naziv;
	private String adresa;
	private String brojTelefona;
	private String grad;
	private String drzava;
	private String geolokacija;
	private int idTipa;
	private double longitude;
	private double latitude;
	//@OneToMany(targetEntity=VirtuelnaPosjeta.class, mappedBy="posjete",cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	//private List<VirtuelnaPosjeta> posjete;
	
	
	public Muzej() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Muzej(int idMuzej, String naziv, String adresa, String brojTelefona, String grad, String drzava,
			String geolokacija, int idTipa,double longitude,double latitude) {
		super();
		this.idMuzej = idMuzej;
		this.naziv = naziv;
		this.adresa = adresa;
		this.brojTelefona = brojTelefona;
		this.grad = grad;
		this.drzava = drzava;
		this.geolokacija = geolokacija;
		this.idTipa = idTipa;
		this.longitude=longitude;
		this.latitude=latitude;
		//this.posjete=posjete;
	}
	public Muzej( String naziv, String adresa, String brojTelefona, String grad, String drzava,
			String geolokacija, int idTipa,double longitude,double latitude) {
		super();
		this.naziv = naziv;
		this.adresa = adresa;
		this.brojTelefona = brojTelefona;
		this.grad = grad;
		this.drzava = drzava;
		this.geolokacija = geolokacija;
		this.idTipa = idTipa;
		this.longitude=longitude;
		this.latitude=latitude;
		//this.posjete=posjete;
	}
	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getIdMuzej() {
		return idMuzej;
	}
	public void setIdMuzej(int idMuzej) {
		this.idMuzej = idMuzej;
	}
	public String getNaziv() {
		return naziv;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public String getAdresa() {
		return adresa;
	}
	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}
	public String getBrojTelefona() {
		return brojTelefona;
	}
	public void setBrojTelefona(String brojTelefona) {
		this.brojTelefona = brojTelefona;
	}
	public String getGrad() {
		return grad;
	}
	public void setGrad(String grad) {
		this.grad = grad;
	}
	public String getDrzava() {
		return drzava;
	}
	public void setDrzava(String drzava) {
		this.drzava = drzava;
	}
	public String getGeolokacija() {
		return geolokacija;
	}
	public void setGeolokacija(String geolokacija) {
		this.geolokacija = geolokacija;
	}
	public int getIdTipa() {
		return idTipa;
	}
	public void setIdTipa(int idTipa) {
		this.idTipa = idTipa;
	}

	
	

}
