<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@page import="racun.beans.TransakcijaBean"%>
    <%@page import="racun.dto.Transakcija"%>
<!DOCTYPE html>
<html>
<head>
<jsp:useBean class="racun.beans.TransakcijaBean" id="transakcijaBean" scope="session"></jsp:useBean>
<jsp:useBean class="racun.beans.RacunBean" id="racunBean" scope="session"></jsp:useBean>
<meta charset="ISO-8859-1">
<title>VirtualBank</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
</head>
<body>

	<div class="mx-auto" style="width: 500px; background-color:white;height:60px">
	<h2>Transakcije korisnika </h2>
	
	</div>
	<div style="float:left">Mogucnost placanja online -> <a href="?action=promijeniMogucnostPlacanja"><img width="20px" alt="Promijeni" src="<%if(racunBean.getRacun().getOnlineKupovina()=='T' ) {out.print("slike/yes.jpg");}else   { out.print("slike/no.png");} %>"></a>
	<p><%=session.getAttribute("notification")!=null?session.getAttribute("notification").toString():""%></p>
	</div>
	<div style="float:right"><a style="text-decoratin:none" href="?action=logout"><button type="button" class="btn btn-dark">Odjava</button></a></div>
	  
	<table class="table table-dark">
	  <thead>
	    <tr>
	      <th scope="col">#</th>
	      <th scope="col">Naziv muzeja</th>
	      <th scope="col">Vrijeme posjete</th>
	      <th scope="col">Vrijeme transakcije</th>
	      <th scope="col">Staro stanje</th>
	      <th scope="col">Novo stanje</th>
	      <th scope="col">Online placanje</th>
	    </tr>
	  </thead>
	  <tbody>
	  <%for(Transakcija t:transakcijaBean.getTransakcije()) {%>
	    <tr>
	      <th scope="row"><%out.print(t.getIdtransakcija()); %></th>
	      <td><%out.print(t.getNazivMuzeja()); %></td>
	      <td><%out.print(t.getDatumPosjete()); %></td>
	      <td><%out.print(t.getVrijeme()); %></td>
	      <td><%out.print(t.getStaroStanje()); %></td>
	      <td><%out.print(t.getNovoStanje()); %></td>
	     
	    </tr>
	    <%} %>
	    
	  </tbody>
	</table>
</body>
</html>