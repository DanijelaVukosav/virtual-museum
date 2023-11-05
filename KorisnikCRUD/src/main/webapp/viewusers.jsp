<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>  
  
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">  
<link rel="stylesheet" href="tabela.css">
<title>View Users</title>  
</head>  
<body>  
  
<%@page import="korisnik.beans.KorisnikBean,korisnik.service.*,java.util.*"%>  

  
<h1>Users List</h1>  
  
<%  
List<KorisnikBean> list=KorisnikDAO.getAllRecords();  
request.setAttribute("list",list);  
System.out.print(list.size());
%>  
  
<table border="1" width="90%">  
<tr><th>Token</th><th>Korisnicko ime</th><th>Lozinka</th><th>Edit</th><th>Delete</th></tr>  
<% for(KorisnikBean u:KorisnikDAO.getAllRecords()) {
System.out.println(u.getUsername());%>
<tr><td><% out.print(u.getToken());%></td><td><% out.print(u.getUsername());%></td><td><% out.print(u.getPassword());%></td> 
<td><a href="editform.jsp?id=${u.getId()}">Edit</a></td>  
<td><a href="deleteuser.jsp?id=${u.getId()}">Delete</a></td></tr>  
<% }%> 
</table>  
  
</body>  
</html> 