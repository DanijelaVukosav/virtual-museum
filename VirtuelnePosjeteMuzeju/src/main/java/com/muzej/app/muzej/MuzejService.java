package com.muzej.app.muzej;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class MuzejService {
	
	@Autowired
	private MuzejRepository repo;
	
	public List<Muzej> listAll()
	{
		return repo.findAll();
	}
	
	public void save(Muzej muzej)
	{
		repo.save(muzej);
	}
	public Muzej getById(Integer id)
	{
		return repo.findById(id).get();
	}
	public void delete(Integer id)
	{
		repo.deleteById(id);
	}

}
