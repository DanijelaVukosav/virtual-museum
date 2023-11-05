package racun.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import racun.beans.RacunBean;
import racun.beans.TransakcijaBean;


/**
 * Servlet implementation class Controller
 */
@WebServlet("/Controller")
public class Controller extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Controller() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		String address = "/WEB-INF/pages/login.jsp";
		String action = request.getParameter("action");
		HttpSession session = request.getSession();

		session.setAttribute("notification", "");

		if (action == null || action.equals("")) {
			address = "/WEB-INF/pages/login.jsp";
		} else if (action.equals("logout")) {
			session.invalidate();
			address = "/WEB-INF/pages/login.jsp";
		} else if (action.equals("login")) {
			String brojKartice = request.getParameter("brojKartice");
			String pin = request.getParameter("pin");
			RacunBean racunBean = new RacunBean();
			if (racunBean.login(brojKartice, pin)) {
				session.setAttribute("racunBean", racunBean);
				TransakcijaBean transakcijaBean = new TransakcijaBean(brojKartice);
				session.setAttribute("transakcijaBean", transakcijaBean);
				address = "/WEB-INF/pages/transakcije.jsp";
			} else {
				session.setAttribute("notification", "Pogresni parametri za pristup");
				//address = "/WEB-INF/pages/transakcije.jsp";
			}
		} 
		else if (action.equals("promijeniMogucnostPlacanja")) {
			RacunBean racunBean = (RacunBean) session.getAttribute("racunBean");
			
			if (racunBean.promijeniMogucnostPlacanja()) {
				
				address = "/WEB-INF/pages/transakcije.jsp";
			} else 
			{
				session.setAttribute("notification", "Doslo je do greske...");
			}
				//address = "/WEB-INF/pages/transakcije.jsp";
			}
		 else {
			RacunBean racunBean = (RacunBean) session.getAttribute("racunBean");
			if (racunBean == null || !racunBean.isLoggedIn()) {
				address = "/WEB-INF/pages/login.jsp";
			} else {
				//if (action.equals("transakcije")) {
					address = "/WEB-INF/pages/transakcije.jsp";  //}
				/* else if (action.equals("newMessage")) {
					address = "/WEB-INF/pages/new_message.jsp";
					MessageBean messageBean = (MessageBean) session.getAttribute("messageBean");
					if (request.getParameter("submit") != null && request.getParameter("text") != null) {
						try {
							String userInfo = userBean.getUser().getLastName() + " " + userBean.getUser().getFirstName()
									+ " (" + userBean.getUser().getUsername() + ")";
							String date = new SimpleDateFormat("dd.MM.yyyy. HH:mm").format(new Date());
							Message book = new Message(request.getParameter("text"), userInfo, date,
									request.getRemoteAddr(), 0);
							if (messageBean.add(book))
								address = "/WEB-INF/pages/messages.jsp";
						} catch (Exception e) {
							session.setAttribute("notification", "ERROR: " + e.getMessage());
						}
					}

				} else {
					address = "/WEB-INF/pages/404.jsp";
				}*/
			}

		}

		RequestDispatcher dispatcher = request.getRequestDispatcher(address);
		dispatcher.forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}