package com.muzej.app.tipovi;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class TipMuzeja {
	private int idTipa;
	private String tip;
	
	public TipMuzeja() {
		super();
		// TODO Auto-generated constructor stub
	}
	public TipMuzeja(int idTipa, String tip) {
		super();
		this.idTipa = idTipa;
		this.tip = tip;
	}
	@Id
	public int getIdTipa() {
		return idTipa;
	}
	public void setIdTipa(int idTipa) {
		this.idTipa = idTipa;
	}
	public String getTip() {
		return tip;
	}
	public void setTip(String tip) {
		this.tip = tip;
	}
	
	

}
