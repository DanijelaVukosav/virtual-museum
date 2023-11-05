package net.etf.rest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.jdt.internal.compiler.ast.ReturnStatement;


import racun.beans.RacunBean;
import racun.dao.RacunDAO;
import racun.dao.TransakcijaDAO;
import racun.dto.Racun;
import racun.dto.Uplatnica;

@Path("racuni/")
public class RestService {

	
	public RestService() {		
	}
	 @GET
	 @Produces(MediaType.APPLICATION_JSON)
	    public Response getHtml() {
		 Racun racun=RacunDAO.dohvatiRacunSaBrojemKartice("1111");
			if(racun!=null)
			{
				
						return Response.status(200).entity(racun).build();
				
			}
			return Response.status(404).entity(null).build();
	    }

	
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
				{
					racun.setStanjeRacuna(racun.getStanjeRacuna()-uplatnica.getIznosUplate());
					RacunDAO.umanjiStanjeRacuna(racun);
					TransakcijaDAO.zapamtiTransakciju(uplatnica,racun);
					return Response.status(200).entity(racun).build();
				}
			}
		}
		return Response.status(404).entity(null).build();
	}

}
