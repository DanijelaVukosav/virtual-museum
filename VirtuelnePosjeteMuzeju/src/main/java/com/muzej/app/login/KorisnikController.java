package com.muzej.app.login;

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
import org.springframework.web.bind.annotation.RestController;

import com.muzej.app.Application;
import com.muzej.app.muzej.Muzej;


@RestController
public class KorisnikController {
	@Autowired
	private KorisnikService service;
	public static final Logger logger = LoggerFactory.getLogger(Application.class);
	
	@GetMapping("/korisnici")
	public List<Korisnik> list()
	{
		logger.info("Dohvatanje liste korisnika ");
		List<Korisnik> retKorisniks=service.listAll();
		for(Korisnik korisnik:retKorisniks)
		System.out.println(korisnik.getUsername());
		return retKorisniks;
		
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/login")
	public  ResponseEntity<Korisnik>  login(@RequestBody Korisnik korisnik)
	{
		logger.info( "Prijava korisnika: "+korisnik.getUsername());
		try {
			System.out.print("Username:" + korisnik.getUsername());
			Korisnik pomKorisnik=service.getByUsername(korisnik.getUsername());
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
	@PostMapping("/korisnici")
	public ResponseEntity<Korisnik> add(@RequestBody Korisnik korisnik)
	{
		logger.info( "Dodavanje korisnika: "+korisnik.getUsername());
		service.save(korisnik);
		return new ResponseEntity<>(korisnik,HttpStatus.OK);
		
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/korisnici/{token}")
	public void update(@RequestBody Korisnik korisnik)
	{
		logger.info("Azuriranje korisnika: "+korisnik.getUsername());
		service.save(korisnik);
		
	}
	@DeleteMapping("/korisnici/{token}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<?> delete(@PathVariable String token)
	{
		logger.info( "Brisanje korisnika: "+ token);
	try 
		{
			service.delete(token);
			return new ResponseEntity<>(HttpStatus.OK);
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<Muzej>(HttpStatus.NOT_FOUND);
		}
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/validacija")
	public  ResponseEntity<Korisnik>  validacija(@RequestBody Korisnik korisnik)
	{
		logger.info( "Provjera postojanosti usernamea: "+ korisnik.getUsername());
		try {
			System.out.print("Username:" + korisnik.getUsername());
			Korisnik pomKorisnik=service.getByUsername(korisnik.getUsername());
			if(pomKorisnik!=null)
			{
				System.out.println("vrati korisniika");
				return new ResponseEntity<>(new Korisnik(),HttpStatus.OK);
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
