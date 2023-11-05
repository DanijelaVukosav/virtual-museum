package com.muzej.app.administrator;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.logging.FileHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.muzej.app.Application;
import com.muzej.app.muzej.Muzej;


@RestController
public class AdministratorController {
	@Autowired
	private AdministratorService service;
	public static final Logger logger = LoggerFactory.getLogger(Application.class);
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/administratori")
	public List<Administrator> list()
	{
		logger.info("Preuzimanje liste administratora");
		return service.listAll();
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/administratori/login")
	public  ResponseEntity<Administrator>  login(@RequestBody Administrator korisnik)
	{
		logger.info("Pokusaj prijave administratora "+korisnik.getUsername());
		
		try {
			System.out.print("Username:" + korisnik.getUsername());
			Administrator pomKorisnik=service.getByUsername(korisnik.getUsername());
			if(pomKorisnik.getPassword().equals(korisnik.getPassword()))
				return new ResponseEntity<>(pomKorisnik,HttpStatus.OK);
			else {
				return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
			}
			
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
		}
		
	}
	@PostMapping("/administratori")
	public void add(@RequestBody Administrator korisnik)
	{
		logger.info( "Dodavanje administratora "+korisnik.getUsername());
		service.save(korisnik);
		
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/administratori/validacija")
	public  ResponseEntity<Administrator>  validacija(@RequestBody Administrator korisnik)
	{
		logger.info( "Provjera da li postoji administrator sa datim usernameom: "+korisnik.getUsername());
		try {
			System.out.print("Username:" + korisnik.getUsername());
			Administrator pomKorisnik=service.getByUsername(korisnik.getUsername());
			if(pomKorisnik!=null)
			{
				System.out.println("vrati korisniika");
				return new ResponseEntity<>(new Administrator(),HttpStatus.OK);
			}
			else {
				return new ResponseEntity<>(null,HttpStatus.OK);
			}
			
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<>(null,HttpStatus.OK);
		}
		
	}

}
