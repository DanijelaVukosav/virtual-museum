<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="korisnik.beans.KorisnikBean,korisnik.service.*,java.util.*"%>  

  
    
<!DOCTYPE html>  
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">  
<link rel="stylesheet" href="tabela.css">
<title>Administracija naloga</title>  
</head>  
<body>  
<%  String token=request.getParameter("token");
KorisnikService service=new KorisnikService();
	
List<KorisnikBean> list=KorisnikDAO.getAllRecords();  
request.setAttribute("list",list);  
System.out.print(list.size());
%>  
<h1 style="float:center"">CRUD administratorskih naloga</h1>

  <div class="topnav">
  <a class="active" href="index.jsp">Aktivni nalozi</a>
  <a href="adduserform.jsp">Dodaj nalog administratora</a>  
  <a style="float:right" href="http://localhost:4200/login"> 
<h3 >Povratak na glavnu aplikaciju</h3>  </a> 
</div>

<table border="1" width="90%">  
<tr><th>Token</th><th>Korisnicko ime</th><th>Lozinka</th><th>Edit</th><th>Delete</th></tr>  
<% for(KorisnikBean u:KorisnikDAO.getAllRecords()) {
System.out.println(u.getUsername());%>
<tr><td><% out.print(u.getToken());%></td><td><% out.print(u.getUsername());%></td><td><% out.print(u.getPassword());%></td> 
<td><a href="editform.jsp?token=<%out.print(u.getToken()); %>">Edit</a></td>  
<td><a href="deleteuser.jsp?token=<%out.print(u.getToken()); %>">Delete</a></td></tr>  
<% }%> 
</table>  

</body>  
</html>  