<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="korisnik.beans.KorisnikBean,korisnik.service.KorisnikDAO"%>  
<!DOCTYPE html>  
<html>  
<head>  
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">  
<title>Edit Form</title>  
<link rel="stylesheet" href="tabela.css">
</head>  
<body>  

  
<%  
String token=request.getParameter("token");  
KorisnikBean u=KorisnikDAO.getRecordByToken(token);  
%>  
  
<h1>Edit </h1>  
<form action="edituser.jsp" method="post">  
<input type="hidden" name="token" value="<%=u.getToken() %>"/>  
<table>  
<tr><td>Korisnicko ime:</td><td>  
<input type="text" name="username" value="<%= u.getUsername()%>"/></td></tr>  
<tr><td>Lozinka:</td><td>  
<input type="password" name="password" value="<%= u.getPassword()%>"/></td></tr>   
</td></tr>  
<tr><td colspan="2"><input type="submit" value="Edit User"/></td></tr>  
</table>  
</form>  
  
</body>  
</html>  