package com.muzej.app.login;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Korisnik {
	private String token;
	private String ime;
	private String prezime;
	private String username;
	private String password;
	private String email;
	
	private char odobrenNalog;
	private char blokiranNalog;
	public Korisnik() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Korisnik(String token, String ime, String prezime, String username, String password, String email,
			char odobrenNalog, char blokiranNalog) {
		super();
		this.token = token;
		this.ime = ime;
		this.prezime = prezime;
		this.username = username;
		this.password = password;
		this.email = email;
		this.odobrenNalog = odobrenNalog;
		this.blokiranNalog = blokiranNalog;
	}
	public Korisnik(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	@Id
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
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
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public char getOdobrenNalog() {
		return odobrenNalog;
	}
	public void setOdobrenNalog(char odobrenNalog) {
		this.odobrenNalog = odobrenNalog;
	}
	public char getBlokiranNalog() {
		return blokiranNalog;
	}
	public void setBlokiranNalog(char blokiranNalog) {
		this.blokiranNalog = blokiranNalog;
	}
	
	

}
