package com.muzej.app.virtuelnaposjeta;

import java.sql.Date;
import java.sql.Time;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.muzej.app.muzej.Muzej;

@Entity
public class VirtuelnaPosjeta 
{
	private int idvirtuelnaposjeta;
	private Date datum;
	@JsonFormat(pattern = "HH:mm")
	@JsonDeserialize(using = SqlTimeDeserializer.class)
	private Time vrijemePocetka;
	private int trajanje;
	private int idMuzej;
	private double cijena;
	
	public VirtuelnaPosjeta() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public VirtuelnaPosjeta(int idvirtuelnaposjeta, Date datum, Time vrijemePocetka, int trajanje,int idMuzej,double cijena) {
		super();
		this.idvirtuelnaposjeta = idvirtuelnaposjeta;
		this.datum = datum;
		this.vrijemePocetka = vrijemePocetka;
		this.trajanje = trajanje;
		this.idMuzej=idMuzej;
		this.cijena=cijena;
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getIdvirtuelnaposjeta() {
		return idvirtuelnaposjeta;
	}
	public void setIdvirtuelnaposjeta(int idvirtuelnaposjeta) {
		this.idvirtuelnaposjeta = idvirtuelnaposjeta;
	}
	
	public double getCijena() {
		return cijena;
	}

	public void setCijena(double cijena) {
		this.cijena = cijena;
	}

	public Date getDatum() {
		return datum;
	}
	public void setDatum(Date datum) {
		this.datum = datum;
	}
	public Time getVrijemePocetka() {
		return vrijemePocetka;
	}
	public void setVrijemePocetka(Time vrijemePocetka) {
		this.vrijemePocetka = vrijemePocetka;
	}
	public int getTrajanje() {
		return trajanje;
	}
	public void setTrajanje(int trajanje) {
		this.trajanje = trajanje;
	}

	public int getIdMuzej() {
		return idMuzej;
	}

	public void setIdMuzej(int idMuzej) {
		this.idMuzej = idMuzej;
	}

	
	
	

}
