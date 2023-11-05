<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import="korisnik.service.KorisnikDAO"%>  
<jsp:useBean id="korisnik" class="korisnik.beans.KorisnikBean" scope="request"></jsp:useBean>  
<jsp:setProperty property="username" name="korisnik"/>  
<jsp:setProperty property="password" name="korisnik"/>  
  
<%  
int i=KorisnikDAO.save(korisnik);  
if(i>0){ 
	System.out.println("DAcuvano i ide na redirekciju");
	response.sendRedirect("adduser-success.jsp");  
}else{  response.sendRedirect("adduser-error.jsp");  
}  
%>  