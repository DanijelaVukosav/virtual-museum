package com.muzej.app.virtuelnaposjeta;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;


@Service
public class VirtuelnaPosjetaService
{
	@Autowired
	private VirtuelnaPosjetaRepository repo;
	
	public List<VirtuelnaPosjeta> listAll()
	{
		return repo.findAll();
	}
	
	public void save(VirtuelnaPosjeta posjeta)
	{
		repo.save(posjeta);
		System.out.println("ID:"+posjeta.getIdvirtuelnaposjeta());
	}
	public VirtuelnaPosjeta getById(Integer id)
	{
		return repo.findById(id).get();
	}
	public void delete(Integer id)
	{
		repo.deleteById(id);
	}

	public List<VirtuelnaPosjeta> posjeteMuzeja(int idMuzej) {
		List<VirtuelnaPosjeta> retList=new ArrayList<VirtuelnaPosjeta>();
		for(VirtuelnaPosjeta posjeta:listAll())
		{
			if(posjeta.getIdMuzej()==idMuzej)
				retList.add(posjeta);
		}
		return retList;
	}


}
