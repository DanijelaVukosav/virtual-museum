package racun.beans;

import java.io.Serializable;
import java.util.ArrayList;

import racun.dao.RacunDAO;
import racun.dao.TransakcijaDAO;
import racun.dto.Racun;
import racun.dto.Transakcija;

public class TransakcijaBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private ArrayList<Transakcija> transakcije = new ArrayList<Transakcija>();
	private boolean isLoggedIn = false;

	public TransakcijaBean()  {
		
		
	}
	public TransakcijaBean(String brojKartice)  {
		try 
		{
			transakcije = TransakcijaDAO.dohvatiTreansakcijeSaBrojemKartice(brojKartice);		
			
		} catch (Exception e) {
			System.out.println("Izuzetak kod citanja transakcija");
		}
		
	}
	public boolean isLoggedIn() {
		return isLoggedIn;
	}

	public void logout() {
		transakcije = new ArrayList<Transakcija>();
		isLoggedIn = false;
	}
	public ArrayList<Transakcija> getTransakcije() {
		return transakcije;
	}

}
