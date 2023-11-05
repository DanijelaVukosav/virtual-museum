package com.muzej.app.virtuelnaprezentacija;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class VirtuelnaPrezentacijaService {
	
	@Autowired
	private VirtuelnaPrezentacijaRepository repo;
	
	public List<Virtuelnaprezentacija> listAll()
	{
		return repo.findAll();
	}
	
	public void save(Virtuelnaprezentacija prezentacija)
	{
		repo.save(prezentacija);
	}
	public Virtuelnaprezentacija getById(Integer id)
	{
		return repo.findById(id).get();
	}
	public void delete(Integer id)
	{
		repo.deleteById(id);
	}

}
