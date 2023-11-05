package com.muzej.app.virtuelnaprezentacija;

import java.io.File;
import java.io.FilenameFilter;
import java.net.http.HttpHeaders;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.muzej.app.Application;

@RestController
public class VirtuelnaPrezentacijaController {
	  public static final String DIRECTORY = System.getProperty("user.home") + "/Downloads/uploads/";

	  public static final Logger logger = LoggerFactory.getLogger(Application.class);
		
	@Autowired
	private VirtuelnaPrezentacijaService service;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/prezentacije")
	@ResponseStatus(HttpStatus.CREATED)
	public List<Virtuelnaprezentacija> list()
	{
		logger.info( "Dohvatanje liste prezentacija");
		return service.listAll();
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/prezentacije/{id}")
	public ResponseEntity<Virtuelnaprezentacija> get(@PathVariable Integer id)
	{
		logger.info(   "Dohvatanje  prezentacije za posjetu "+id);
		try {
			Virtuelnaprezentacija prezentacija = service.getById(id);
			return new ResponseEntity<Virtuelnaprezentacija>(prezentacija,HttpStatus.OK);
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<Virtuelnaprezentacija>(HttpStatus.NOT_FOUND);
		}
		
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/prezentacije")
	public void add(@RequestBody Virtuelnaprezentacija prezentacija)
	{
		logger.info(  "KReiranje  prezentacija za posjetu "+prezentacija.getIdvirtuelnaposjeta());
		service.save(prezentacija);
		
	}
	
	
	@DeleteMapping("/prezentacije/{id}")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<?> delete(@PathVariable Integer id)
	{
		logger.info(  "Brisanje  prezentacije za posjetu "+id);
		try 
		{
			File f = new File(DIRECTORY);

            FilenameFilter filter = new FilenameFilter() {
                @Override
                public boolean accept(File f, String name) {
                    // We want to find only .c files
                    return name.startsWith(id+"_");
                }
            };
            File[] files = f.listFiles(filter);

            for (int i = 0; i < files.length; i++) {
                files[i].delete();
            }
			service.delete(id);
			return new ResponseEntity<>(HttpStatus.OK);
			
		} catch (NoSuchElementException ex) {
			logger.error( ex.toString());
			return new ResponseEntity<Virtuelnaprezentacija>(HttpStatus.NOT_FOUND);
		}
	}
}
