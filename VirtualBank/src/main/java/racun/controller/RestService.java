package racun.controller;

import javax.enterprise.inject.New;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.jdt.internal.compiler.ast.ReturnStatement;


import racun.beans.RacunBean;
import racun.dao.RacunDAO;
import racun.dto.Racun;
import racun.dto.Uplatnica;

@Path("/racun")
public class RestService {

	
	public RestService() {		
	}
	 @GET
	    @Produces("text/html")
	    public String getHtml() {
	        return "<html lang=\"en\"><body><h1>Hello, World!!</h1></body></html>";
	    }

	@javax.ws.rs.OPTIONS
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response add(Uplatnica  uplatnica) {
		System.out.println(uplatnica.getBrojKartice());
		Racun racun=RacunDAO.dohvatiRacunSaBrojemKartice(uplatnica.getBrojKartice());
		if(racun!=null)
		{
			if(racun.getPin().equals(uplatnica.getPin()) && racun.getIme().equals(uplatnica.getIme()) && racun.getPrezime().equals(uplatnica.getPrezime()) && racun.getTipKartice().equals(uplatnica.getTipKartice()) && racun.getDatumIsticanjaKartice().equals(uplatnica.getDatumIsticanja()))
			{
				if(racun.getOnlineKupovina()=='T' && racun.getStanjeRacuna()>=uplatnica.getIznosUplate())
					return Response.status(200).entity(racun).build();
			}
		}
		return Response.status(404).entity(null).build();
	}

}
