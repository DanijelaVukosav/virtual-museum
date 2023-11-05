<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import="korisnik.service.KorisnikDAO"%>  
<%@page import="korisnik.beans.KorisnikBean"%> 
<jsp:useBean id="korisnik" class="korisnik.beans.KorisnikBean"></jsp:useBean>  
<jsp:setProperty property="username" name="korisnik"/>  
<jsp:setProperty property="password" name="korisnik"/>   
<jsp:setProperty property="token" name="korisnik"/> 
<%  
//korisnik.setToken(request.getParameter("token"));
int i=KorisnikDAO.update(korisnik);  
response.sendRedirect("index.jsp");  
%>  