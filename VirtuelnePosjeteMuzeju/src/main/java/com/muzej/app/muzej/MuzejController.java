package com.muzej.app.muzej;

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
public class MuzejController {
	
	@Autowired
	private MuzejService service;
	@Autowired
	private KorisnikService serviceKorisnika;
	@Autowired
	private AdministratorService serviceAdmina;
	public static final Logger logger = LoggerFactory.getLogger(Application.class);
	
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/muzeji")
	@ResponseStatus(HttpStatus.CREATED)
	public  ResponseEntity<?>  list(@RequestHeader("authorization") String value)
	{
		logger.info( "Dohvatanje liste muzeja od starne korisnika: "+ value);
		
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
       		logger.error( ex.toString());
			// TODO: handle exception
		}
       try {
    	   serviceAdmina.getById(dekodovano);
           autorizovano=true;
       	}catch (Exception ex) { 
       		logger.error( ex.toString());
			// TODO: handle exception
		}
       
       if(autorizovano)
       {
    	   List<Muzej> muzejiList=service.listAll();
    	   return new ResponseEntity<>(muzejiList,HttpStatus.OK);
    	   //return service.listAll();
       }
       else 
       {
    	   return new ResponseEntity<Muzej>(HttpStatus.UNAUTHORIZED);
       }
	}
       
		
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/muzeji/{id}")
	public ResponseEntity<Muzej> get(@PathVariable Integer id)
	{
		logger.info( "Dohvatanje  muzeja: "+ id);
		try {
			Muzej muzej = service.getById(id);
			return new ResponseEntity<Muzej>(muzej,HttpStatus.OK);
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<Muzej>(HttpStatus.NOT_FOUND);
		}
		
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/muzeji")
	public void add(@RequestBody Muzej muzej)
	{
		logger.info(  "Kreiranje muzeja : "+ muzej.getNaziv());
		System.out.println("Tip id:"+muzej.getGrad());
		service.save(muzej);
		
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/muzeji/{id}")
	public  ResponseEntity<?>  update(@RequestBody Muzej muzej,@PathVariable Integer id)
	{
		logger.info(  "Azuriranje muzeja : "+ muzej.getNaziv());
		try {
			Muzej existingMuzej =service.getById(id);
			service.save(muzej);
			return new ResponseEntity<>(HttpStatus.OK);
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<Muzej>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@DeleteMapping("/muzeji/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<?> delete(@PathVariable Integer id)
	{
		logger.info( "Brisanje muzeja : "+ id);
		
	try 
		{
			service.delete(id);
			return new ResponseEntity<>(HttpStatus.OK);
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<Muzej>(HttpStatus.NOT_FOUND);
		}
	}
}
