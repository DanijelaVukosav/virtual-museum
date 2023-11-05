package com.muzej.app.administrator;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Administrator {
	private String token;
	private String username;
	private String password;
	
	private char odobrenNalog;
	private char blokiranNalog;
	public Administrator() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Administrator(String token, String username, String password) {
		super();
		this.token = token;
		this.username = username;
		this.password = password;
	}
	public Administrator(String username, String password) {
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
	
	

}
