package korisnik.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import korisnik.beans.KorisnikBean;
import korisnik.beans.TokenBean;

public class TokenDAO {

	public TokenDAO() {
		// TODO Auto-generated constructor stub
	}

public static TokenBean getRecordByToken(String token){  
    TokenBean tb=null;  
    try{  
        Connection con=KorisnikDAO.getConnection();  
        PreparedStatement ps=con.prepareStatement("select * from token where token=?");  
        ps.setString(1,token);  
        ResultSet rs=ps.executeQuery();  
        while(rs.next()){  
            tb=new TokenBean();  
            tb.setToken(rs.getString("token"));   
        }  
    }catch(Exception e){System.out.println(e);}  
    return tb;  
}  

}
