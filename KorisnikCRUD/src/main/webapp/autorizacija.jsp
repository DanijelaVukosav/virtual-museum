<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="korisnik.beans.TokenBean" %>
<%@ page import="korisnik.service.TokenDAO" %>
<!DOCTYPE html>
<%
	if (request.getParameter("token") != null) {
		String token=request.getParameter("token");
		if (TokenDAO.getRecordByToken(token) != null) {
			session.setAttribute("notification", "");
			response.sendRedirect("index.jsp");
		} else {
			session.setAttribute("notification", "Unijeli ste token koji je nevazeci.");
		}
	} else {
		session.setAttribute("notification", "Token nije poslat!");
	}
%>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<h3><%=session.getAttribute("notification").toString()%></h3>
</body>
</html>