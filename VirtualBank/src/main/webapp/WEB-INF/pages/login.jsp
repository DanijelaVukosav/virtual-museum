<%@page import="racun.beans.RacunBean"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
		<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<title>VirtualBank</title>
		<link href="login.css" type="text/css" rel="stylesheet">
	</head>
	<body>
		
		<div class="wrapper fadeInDown">
		  <div id="formContent">
		    <!-- Tabs Titles -->
		
		    <!-- Icon -->
		    <div class="fadeIn first">
		      <h4>Prijava na sistem</h4>
		    </div>
		
		    <!-- Login Form -->
		    <form  action="?action=login" method="post">
		      <input type="text" id="brojKartice" class="fadeIn second" name="brojKartice" placeholder="Broj kartice">
		      <input type="password" id="pin" class="fadeIn second" name="pin" placeholder="Pin kod     ">      
		      <input type="submit" class="fadeIn fourth" value="Prijava">
		    </form>
		
		    <!-- Remind Passowrd -->
		    <div id="formFooter">
		      <%=session.getAttribute("notification")!=null?session.getAttribute("notification").toString():""%>
		    </div>
		
		  </div>
		</div>
	</body>
</html>