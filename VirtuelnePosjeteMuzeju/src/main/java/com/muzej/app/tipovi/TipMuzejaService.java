package com.muzej.app.tipovi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class TipMuzejaService 
{
	@Autowired
	private TipMuzejaRepository repo;
	
	public List<TipMuzeja> listAll()
	{
		return repo.findAll();
	}
	
	public void save(TipMuzeja korisnik)
	{
		repo.save(korisnik);
	}
	public TipMuzeja getById(int id)
	{
		return repo.findById(id).get();
	}
	
	public void delete(Integer id)
	{
		repo.deleteById(id);
	}
}
