package korisnik.beans;

import java.io.Serializable;

public class KorisnikBean implements Serializable {
	
	private String token;
	private String username;
	private String password;
	public KorisnikBean(String token, String username, String password) {
		super();
		this.token = token;
		this.username = username;
		this.password = password;
	}
	public KorisnikBean() {
		super();
		// TODO Auto-generated constructor stub
	}
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
	public KorisnikBean(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	

	
	

}
