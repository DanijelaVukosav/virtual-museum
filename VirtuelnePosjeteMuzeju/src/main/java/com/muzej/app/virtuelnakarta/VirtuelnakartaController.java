package com.muzej.app.virtuelnakarta;

import java.net.http.HttpHeaders;
import java.util.Base64;
import java.util.List;
import java.util.NoSuchElementException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.muzej.app.Application;
import com.muzej.app.administrator.Administrator;
import com.muzej.app.administrator.AdministratorService;
import com.muzej.app.login.Korisnik;
import com.muzej.app.login.KorisnikService;

@RestController
public class VirtuelnakartaController {
	public static final Logger logger = LoggerFactory.getLogger(Application.class);
	
	
	@Autowired
	private VirtuelnakartaService service;
	@Autowired
	private KorisnikService serviceKorisnika;
	@Autowired
	private AdministratorService serviceAdmina;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/karta")
	@ResponseStatus(HttpStatus.CREATED)
	public  ResponseEntity<?>  list(@RequestHeader("authorization") String value)
	{
		
		logger.info( "Zahtjeva za listom svih virtuelnih karti");
    	   List<Virtuelnakarta> karte=service.listAll();
    	   return new ResponseEntity<>(karte,HttpStatus.OK);
    	   
	}
       
		
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/karta/{id}")
	public ResponseEntity<Virtuelnakarta> get(@PathVariable Integer id)
	{
		logger.info(   "Zahtjeva za virtuelnon kartom "+id);
		try {
			Virtuelnakarta karta = service.getById(id);
			return new ResponseEntity<Virtuelnakarta>(karta,HttpStatus.OK);
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<Virtuelnakarta>(HttpStatus.NOT_FOUND);
		}
		
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/karta")
	public ResponseEntity<?> add(@RequestBody Virtuelnakarta karta)
	{
		//System.out.println("Tip id:"+muzej.getGrad());
		logger.info(  "Dodavanje nove karte za posjetu "+karta.getIdvirtuelnaposjeta());
		
		service.save(karta);
		return new ResponseEntity<Virtuelnakarta>(karta,HttpStatus.OK);
		
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/karta/{id}")
	public  ResponseEntity<?>  update(@RequestBody Virtuelnakarta karta,@PathVariable Integer id)
	{
		logger.info(  "Azuriranje nove karte za posjetu "+karta.getIdvirtuelnaposjeta());
		try {
			Virtuelnakarta existingMuzej =service.getById(id);
			service.save(karta);
			return new ResponseEntity<>(HttpStatus.OK);
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<Virtuelnakarta>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@DeleteMapping("/karta/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<?> delete(@PathVariable Integer id)
	{
		logger.info(   "Brisanje karte  "+id);
	try 
		{
			service.delete(id);
			return new ResponseEntity<>(HttpStatus.OK);
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<Virtuelnakarta>(HttpStatus.NOT_FOUND);
		}
	}
}
