package com.muzej.app.virtuelnaposjeta;

import java.util.ArrayList;
import java.util.Base64;
import java.io.Console;
import java.sql.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.muzej.app.Application;
import com.muzej.app.administrator.AdministratorService;
import com.muzej.app.login.KorisnikService;
import com.muzej.app.muzej.Muzej;
import com.muzej.app.virtuelnakarta.Virtuelnakarta;
import com.muzej.app.virtuelnakarta.VirtuelnakartaService;

@RestController
public class VirtuelnaPosjetaController 
{
	public static final Logger logger = LoggerFactory.getLogger(Application.class);
	
	@Autowired
	private VirtuelnaPosjetaService service;
	@Autowired
	private KorisnikService serviceKorisnika;
	@Autowired
	private AdministratorService serviceAdmina;
	@Autowired
	private VirtuelnakartaService kartaService;
	
	@GetMapping("/posjete")
	public  ResponseEntity<?> list(@RequestHeader("authorization") String value)
	{
		logger.info(  "Dohvatenje liste posjeta od strane korisnika nove karte za posjetu "+value);
		 System.out.println("valuue:" + value);
	       //byte[] decodedBytes = Base64.getDecoder().decode(value);
	       //String decodedString = new String(decodedBytes);
	      // System.out.println("Dekodovano citavo:" + decodedString);
	       System.out.println("Dekodovati :" + value.substring(5).trim());
	       byte[] decodedBytes = Base64.getDecoder().decode(value.substring(5).trim());
	       String dekodovano = new String(decodedBytes);
	       System.out.println("Dekodovati :" + value.substring(5).trim());
	       System.out.println("Dekodovano :" + dekodovano);
	       boolean autorizovano=false;
	       try {
	    	   serviceKorisnika.getById(dekodovano);
	           autorizovano=true;
	       	}catch (Exception ex) { 
	       		System.out.println("NEMA KORISNIKA");
				// TODO: handle exception
			}
	       try {
	    	   serviceAdmina.getById(dekodovano);
	           autorizovano=true;
	       	}catch (Exception ex) { 
	       		ex.printStackTrace();
	       		System.out.println("NEMA KORISNIKA");
				// TODO: handle exception
			}
	       
	       if(autorizovano)
	       {
	    	   List<VirtuelnaPosjeta> posjete=service.listAll();
	    	   return new ResponseEntity<>(posjete,HttpStatus.OK);
	    	   //return service.listAll();
	       }
	       else 
	       {
	    	   return new ResponseEntity<Muzej>(HttpStatus.UNAUTHORIZED);
	       }
	}
	@GetMapping("/posjete/muzej/{idMuzej}")
	public List<VirtuelnaPosjeta> posjeteMuzeja(@PathVariable Integer idMuzej)
	{
		logger.info(  "Dohvatenje liste posjeta za muzej "+idMuzej);
		return service.posjeteMuzeja(idMuzej);
	}
	@GetMapping("/posjete/{id}")
	public ResponseEntity<VirtuelnaPosjeta> get(@PathVariable Integer id)
	{
		logger.info(  "Dohvatenje virtuelne posjete  "+id);
		try {
			VirtuelnaPosjeta posjeta = service.getById(id);
			return new ResponseEntity<VirtuelnaPosjeta>(posjeta,HttpStatus.OK);
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<VirtuelnaPosjeta>(HttpStatus.NOT_FOUND);
		}
		
	}

	@PostMapping("/posjete")
	public ResponseEntity<VirtuelnaPosjeta> add(@RequestBody VirtuelnaPosjeta posjeta)
	{
		logger.info(   "Kreiranje virtuelne posjete");
		service.save(posjeta);
		System.out.println(" Controller" +posjeta.getIdvirtuelnaposjeta());
		return new ResponseEntity<>(posjeta,HttpStatus.OK);
		
	}
	@CrossOrigin("http://localhost:4200")
	@PostMapping("/posjete/{id}")
	public  ResponseEntity<?>  update(@RequestBody VirtuelnaPosjeta posjeta,@PathVariable Integer id)
	{
		logger.info(  "Azuriranje virtuelne posjete" +id);
		try {
			VirtuelnaPosjeta existingPosjeta=service.getById(id);
			service.save(posjeta);
			return new ResponseEntity<>(posjeta,HttpStatus.OK);
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<VirtuelnaPosjeta>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@DeleteMapping("/posjete/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id)
	{
		logger.info(   "Brisanje virtuelne posjete"+id);
		try 
		{
			service.delete(id);
			return new ResponseEntity<>(HttpStatus.OK);
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<VirtuelnaPosjeta>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/posjete/karte/{token}")
	public List<VirtuelnaPosjeta> karteKorisnika(@PathVariable String token)
	{
		logger.info(   "Dohvatanje karata korisnika "+token);
		List<Virtuelnakarta> karteKorisnika= kartaService.karteKorisnika(token);
		List<VirtuelnaPosjeta> posjeteList=new ArrayList<VirtuelnaPosjeta>();
		System.out.println("TOKEN: "+ token);
		for(Virtuelnakarta karta:karteKorisnika)
		{
			
			VirtuelnaPosjeta posjeta= service.getById(Integer.parseInt(karta.getIdvirtuelnaposjeta()));
			
				posjeteList.add(posjeta);
		}
		System.out.println("Vrati: "+ posjeteList.size());
		return posjeteList;
	
		
	}

}
