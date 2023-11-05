package racun.dao;

import racun.dto.Racun;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class RacunDAO {
	
	private static ConnectionPool connectionPool = ConnectionPool.getConnectionPool();
	private static final String SQL_SELECT_BY_BrojKartice_AND_Pin = "SELECT * FROM bankovniracun WHERE brojKartice=? AND pin=?";
	private static final String SQL_SELECT_BY_BrojKartice = "SELECT * FROM bankovniracun WHERE brojKartice=?";
	private static final String SQL_UPDATE_OnlinePlacanje_BY_BrojKartice = "update bankovniracun set onlineKupovina=? where brojKartice=?";
	private static final String SQL_UPDATE_STATE_ON_ACCOUNT = "update bankovniracun set stanjeRacuna=? where brojKartice=?";
	//private static final String SQL_GET_ALL = "Select * from bankovniracun";

	public RacunDAO() {
		// TODO Auto-generated constructor stub
	}

	public static Racun dohvatiRacunSaBrojemKarticeIPinom(String brojKartica, Integer pin) {
		Racun racun = null;
		Connection connection = null;
		ResultSet rs = null;
		Object values[] = {brojKartica, pin};
		try {
			connection = connectionPool.checkOut();
			PreparedStatement pstmt = DAOUtil.prepareStatement(connection,
					SQL_SELECT_BY_BrojKartice_AND_Pin, false, values);
			rs = pstmt.executeQuery();
			if (rs.next()){
				racun = new Racun(rs.getString("brojKartice"), rs.getString("ime"), rs.getString("prezime"), rs.getString("tipKartice"), rs.getString("datumIsticanjaKartice"), rs.getString("pin"), rs.getInt("stanjeRacuna"),rs.getString("onlinekupovina").charAt(0));
			}
			pstmt.close();
		} catch (SQLException exp) {
			exp.printStackTrace();
		} finally {
			connectionPool.checkIn(connection);
		}
		return racun;
	}
	public static Racun dohvatiRacunSaBrojemKartice(String brojKartica) {
		Racun racun = null;
		Connection connection = null;
		ResultSet rs = null;
		Object values[] = {brojKartica};
		try {
			connection = connectionPool.checkOut();
			PreparedStatement pstmt = DAOUtil.prepareStatement(connection,
					SQL_SELECT_BY_BrojKartice, false, values);
			rs = pstmt.executeQuery();
			if (rs.next()){
				racun = new Racun(rs.getString("brojKartice"), rs.getString("ime"), rs.getString("prezime"), rs.getString("tipKartice"), rs.getString("datumIsticanjaKartice"), rs.getString("pin"), rs.getInt("stanjeRacuna"),rs.getString("onlinekupovina").charAt(0));
			}
			pstmt.close();
		} catch (SQLException exp) {
			exp.printStackTrace();
		} finally {
			connectionPool.checkIn(connection);
		}
		return racun;
	}

	public static boolean promijeniMogucnostPlacanja(String brojKartice) {
		Racun racun=RacunDAO.dohvatiRacunSaBrojemKartice(brojKartice);
		String znak;
		if(racun.getOnlineKupovina()=='T')
			znak="F";
		else 
		{
			znak="T";
		}
		Object values[] = {znak,brojKartice};
		Connection connection = null;
		ResultSet rs = null;
		try {
			connection = connectionPool.checkOut();
			PreparedStatement pstmt = DAOUtil.prepareStatement(connection,
					SQL_UPDATE_OnlinePlacanje_BY_BrojKartice, false, values);
			pstmt.executeUpdate();
			
			pstmt.close();
			return true;
		} catch (SQLException exp) {
			exp.printStackTrace();
		} finally {
			connectionPool.checkIn(connection);
		}
		return false;
	}

	public static boolean umanjiStanjeRacuna(Racun racun) {
		Object values[] = {racun.getStanjeRacuna(),racun.getBrojKartice()};
		Connection connection = null;
		ResultSet rs = null;
		try {
			connection = connectionPool.checkOut();
			PreparedStatement pstmt = DAOUtil.prepareStatement(connection,
					SQL_UPDATE_STATE_ON_ACCOUNT, false, values);
			pstmt.executeUpdate();
			
			pstmt.close();
			return true;
		} catch (SQLException exp) {
			exp.printStackTrace();
		} finally {
			connectionPool.checkIn(connection);
		}
		return false;
		
	}

	
	

}
