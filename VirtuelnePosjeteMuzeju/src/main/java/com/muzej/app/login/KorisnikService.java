package com.muzej.app.login;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class KorisnikService 
{
	@Autowired
	private KorisnikRepository repo;
	
	public List<Korisnik> listAll()
	{
		return repo.findAll();
	}
	
	public void save(Korisnik korisnik)
	{
		repo.save(korisnik);
	}
	public Korisnik getById(String token)
	{
		return repo.findById(token).get();
	}
	public Korisnik getByUsername(String username)
	{
		return repo.findByUsername(username);
	}
	public void delete(String token)
	{
		repo.deleteById(token);
	}
}
