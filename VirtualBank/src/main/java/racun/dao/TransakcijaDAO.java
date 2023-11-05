package racun.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.enterprise.inject.New;

import racun.beans.TransakcijaBean;
import racun.dto.Racun;
import racun.dto.Transakcija;
import racun.dto.Uplatnica;

public class TransakcijaDAO {
	private static ConnectionPool connectionPool = ConnectionPool.getConnectionPool();
	private static final String SQL_SELECT_BY_BrojKartice_AND_Pin = "SELECT * FROM bankovniracun WHERE brojKartice=? AND pin=?";
	private static final String SQL_Add_Transaction = "insert into transakcija(brojKartice,staroStanje,novoStanje,idvirtuelnaposjeta) values( ?,?,?,?)";
	private static final String SQL_GET_ALL = "select idtransakcija,brojKartice,staroStanje,novoStanje,vrijeme,datum,naziv from (Select idtransakcija,brojKartice,staroStanje,novoStanje,datum,vrijeme,id_muzej from transakcija inner join virtuelna_posjeta where brojKartice=?)as nova left join muzej  on nova.id_muzej=muzej.id_muzej;";

	public TransakcijaDAO() {
		// TODO Auto-generated constructor stub
	}
	public static ArrayList<Transakcija> dohvatiTreansakcijeSaBrojemKartice(String brojKartica) {
		ArrayList<Transakcija> retVal = new ArrayList<Transakcija>();
		Connection connection = null;
		ResultSet rs = null;
		Object values[] = {brojKartica};
		try {
			connection = connectionPool.checkOut();
			PreparedStatement pstmt = DAOUtil.prepareStatement(connection, SQL_GET_ALL, false, values);
			rs = pstmt.executeQuery();
			while (rs.next()) {
				retVal.add(new Transakcija(rs.getInt("idtransakcija"), rs.getString("brojKartice"), rs.getInt("staroStanje"), rs.getInt("novoStanje"),
						rs.getDate("vrijeme"),rs.getDate("datum"), rs.getString("naziv")));
			}
			pstmt.close();
		} catch (SQLException exp) {
			exp.printStackTrace();
		} finally {
			connectionPool.checkIn(connection);
		}
		return retVal;
	}
	public static boolean zapamtiTransakciju(Uplatnica uplatnica,Racun racun) {
		double staroStanje=racun.getStanjeRacuna()+uplatnica.getIznosUplate();
		Object values[] = {uplatnica.getBrojKartice(),staroStanje,racun.getStanjeRacuna(),uplatnica.getIdvirtuelnaposjeta()};
		Connection connection = null;
		ResultSet rs = null;
		try {
			connection = connectionPool.checkOut();
			PreparedStatement pstmt = DAOUtil.prepareStatement(connection,
					SQL_Add_Transaction, false, values);
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
