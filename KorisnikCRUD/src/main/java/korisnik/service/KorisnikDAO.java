package korisnik.service;
  
import java.sql.*;  
import java.util.ArrayList;  
import java.util.List;
import java.util.Random;

import connectionpool.ConnectionPool;
import korisnik.beans.KorisnikBean;  
  
public class KorisnikDAO {  
  
public static Connection getConnection(){  
    Connection con=null;  
    try{  
        con=ConnectionPool.getInstance().checkOut(); 
    }catch(Exception e){System.out.println(e);}  
    return con;  
}  
public static int save(KorisnikBean u){  
    int status=0;  
    String token=generateToken();
    try{  
    	System.out.println("DToken" + token);
        Connection con=getConnection();  
        PreparedStatement ps=con.prepareStatement(  
"insert into administrator values(?,?,?)");  
        ps.setString(2,u.getUsername());  
        ps.setString(3,u.getPassword());   
        ps.setString(1, token);
        status=ps.executeUpdate();  
    }catch(Exception e){System.out.println(e);}  
    System.out.println("Vracanje iz save");
    return status;  
}  
private static String generateToken() {
	String tokenString="";
	while(tokenString.equals(""))
	{
		String token=Integer.toString(new Random(1000L).nextInt());
		if(getRecordByToken(token)==null)
		{
			tokenString=token;
		}
	}
	return tokenString;
}
public static int update(KorisnikBean u){  
    int status=0;  
    try{  
        Connection con=getConnection();  
        PreparedStatement ps=con.prepareStatement(  
"update administrator set username=?,password=? where token=?");  
        ps.setString(1,u.getUsername());  
        ps.setString(2,u.getPassword());  
        ps.setString(3,u.getToken());    
        status=ps.executeUpdate();  
    }catch(Exception e){System.out.println(e);}  
    return status;  
}  
public static int delete(KorisnikBean u){  
    int status=0;  
    try{  
        Connection con=getConnection();  
        PreparedStatement ps=con.prepareStatement("delete from administrator where token=?");  
        ps.setString(1,u.getToken());  
        status=ps.executeUpdate();  
    }catch(Exception e){System.out.println(e);}  
  
    return status;  
}  
public static List<KorisnikBean> getAllRecords(){  
    List<KorisnikBean> list=new ArrayList<KorisnikBean>();  
      
    try{  
        Connection con=getConnection();  
        PreparedStatement ps=con.prepareStatement("select * from administrator");  
        ResultSet rs=ps.executeQuery();  
        while(rs.next()){  
        	KorisnikBean u=new KorisnikBean();  
            u.setToken(rs.getString("token"));  
            u.setUsername(rs.getString("username"));  
            u.setPassword(rs.getString("password"));  
            list.add(u);  
        }  
    }catch(Exception e){System.out.println(e);}  
    return list;  
}  
public static KorisnikBean getRecordByToken(String token){  
    KorisnikBean u=null;  
    try{  
        Connection con=getConnection();  
        PreparedStatement ps=con.prepareStatement("select * from administrator where token=?");  
        ps.setString(1,token);  
        ResultSet rs=ps.executeQuery();  
        while(rs.next()){  
            u=new KorisnikBean();  
            u.setToken(rs.getString("token"));  
            u.setUsername(rs.getString("username"));  
            u.setPassword(rs.getString("password"));  
        }  
    }catch(Exception e){System.out.println(e);}  
    return u;  
}  
}  