package com.muzej.app.virtuelnakarta;

import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.muzej.app.virtuelnaposjeta.VirtuelnaPosjeta;

@Entity
public class Virtuelnakarta 
{
	private int idvirtuelnakarta;
	private String idvirtuelnaposjeta;
	private String token;
	public Virtuelnakarta() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Virtuelnakarta(int idvirtuelnakarta, String idvirtuelnaposjeta, String token) {
		super();
		this.idvirtuelnakarta = idvirtuelnakarta;
		this.idvirtuelnaposjeta = idvirtuelnaposjeta;
		this.token = token;
	}
	public Virtuelnakarta(String idvirtuelnaposjeta, String token) {
		super();
		this.idvirtuelnaposjeta = idvirtuelnaposjeta;
		this.token = token;
	}
	@Id
	public int getIdvirtuelnakarta() {
		return idvirtuelnakarta;
	}
	public void setIdvirtuelnakarta(int idvirtuelnakarta) {
		this.idvirtuelnakarta = idvirtuelnakarta;
	}
	public String getIdvirtuelnaposjeta() {
		return idvirtuelnaposjeta;
	}
	public void setIdvirtuelnaposjeta(String idvirtuelnaposjeta) {
		this.idvirtuelnaposjeta = idvirtuelnaposjeta;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
}
