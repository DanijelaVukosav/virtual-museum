package racun.beans;

import java.io.Serializable;

import racun.dao.RacunDAO;
import racun.dto.Racun;

public class RacunBean implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Racun racun = new Racun();
	private boolean isLoggedIn = false;

	public RacunBean() {
		// TODO Auto-generated constructor stub
	}
	public boolean login(String brojKartica, String pin) {
		try {
			if ((racun = RacunDAO.dohvatiRacunSaBrojemKarticeIPinom(brojKartica, Integer.parseInt(pin))) != null) {
				isLoggedIn = true;
				return true;
			}
			return false;
			
		} catch (Exception e) {
			return false;
		}
		
	}
	public boolean isLoggedIn() {
		return isLoggedIn;
	}

	public void logout() {
		racun = new Racun();
		isLoggedIn = false;
	}
	public Racun getRacun() {
		return racun;
	}

	public boolean isUserNameAllowed(String username) {
		//return UserDAO.isUserNameUsed(username);
		return true;
	}
	
	public boolean add(Racun Racun) {
		//return UserDAO.insert(user);
		return true;
	}
	public boolean promijeniMogucnostPlacanja() {
		if(RacunDAO.promijeniMogucnostPlacanja(racun.getBrojKartice()))
		{
			if(racun.getOnlineKupovina()=='T')
				this.racun.setOnlineKupovina('F');
			else {
				this.racun.setOnlineKupovina('T');
			}
			return true;
		}
		return false;
	}

}
