package com.muzej.app.administrator;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AdministratorService 
{
	@Autowired
	private AdministratorRepository repo;
	
	public List<Administrator> listAll()
	{
		return repo.findAll();
	}
	
	public void save(Administrator korisnik)
	{
		repo.save(korisnik);
	}
	public Administrator getById(String token)
	{
		return repo.findById(token).get();
	}
	public Administrator getByUsername(String username)
	{
		return repo.findByUsername(username);
	}
	public void delete(String token)
	{
		repo.deleteById(token);
	}
}
