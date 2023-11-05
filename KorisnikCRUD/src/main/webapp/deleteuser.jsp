<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import="korisnik.service.KorisnikDAO"%>  
<%@page import="korisnik.beans.KorisnikBean"%> 
<jsp:useBean id="nalog" class="korisnik.beans.KorisnikBean"></jsp:useBean>  
<jsp:setProperty property="*" name="nalog"/>  
<% 
int i=KorisnikDAO.delete(nalog);  
response.sendRedirect("index.jsp");  
%>  