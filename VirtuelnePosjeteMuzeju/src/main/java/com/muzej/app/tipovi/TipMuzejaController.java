package com.muzej.app.tipovi;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.muzej.app.muzej.Muzej;


@RestController
public class TipMuzejaController {
	@Autowired
	private TipMuzejaService service;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/tipovi")
	public List<TipMuzeja> list()
	{
		return service.listAll();
	}
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/tipovi/{id}")
	public ResponseEntity<TipMuzeja> get(@PathVariable Integer id)
	{
		try {
			TipMuzeja tip = service.getById(id);
			return new ResponseEntity<TipMuzeja>(tip,HttpStatus.OK);
			
		} catch (NoSuchElementException ex) {
			return new ResponseEntity<TipMuzeja>(HttpStatus.NOT_FOUND);
		}
		
	}
	

}
