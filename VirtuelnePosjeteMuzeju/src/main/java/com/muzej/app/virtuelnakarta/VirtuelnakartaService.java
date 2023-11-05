package com.muzej.app.virtuelnakarta;

import com.muzej.app.*;
import com.muzej.app.login.Korisnik;
import com.muzej.app.login.KorisnikService;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.muzej.app.mail.Mail;
import com.muzej.app.mail.MailService;
import com.muzej.app.muzej.MuzejService;
import com.muzej.app.pdf.UserPDFExporter;
import com.muzej.app.virtuelnaposjeta.VirtuelnaPosjeta;
import com.muzej.app.virtuelnaposjeta.VirtuelnaPosjetaService;



@Service
public class VirtuelnakartaService {
	
	@Autowired
	private VirtuelnakartaRepository repo;
	@Autowired
	private MailService mailService;
	@Autowired
	private KorisnikService korisnikService;
	@Autowired
	private VirtuelnaPosjetaService vpService;
	@Autowired
	private MuzejService muzejService;
	
	public List<Virtuelnakarta> listAll()
	{
		return repo.findAll();
	}
	
	public void save(Virtuelnakarta karta)
	{
		boolean postojikarta=true;
		int brojKarte=0;
		Random random=new Random();
		while(postojikarta)
		{
			brojKarte=random.nextInt(1000000);
			try {
				if(this.getById(brojKarte)==null)
					postojikarta=false;
			} catch (Exception ex) {
				postojikarta=false;
			}
			
		}
		karta.setIdvirtuelnakarta(brojKarte);

        Mail mail = new Mail();
        mail.setMailFrom("danijela99vukosav@gmail.com");
        mail.setMailTo("danijela99vukosav@gmail.com");
        mail.setMailSubject("Virtuelna karta");
        //mail.setMailContent("Learn How to send Email using Spring Boot!!!\n\nThanks\nwww.technicalkeeda.com");
        
       // mailService.sendEmail(mail);
		repo.save(karta);
       
        VirtuelnaPosjeta vPosjeta=vpService.getById(Integer.parseInt(karta.getIdvirtuelnaposjeta()));
        
        mailService.sendEmailPDF(mail,korisnikService.getById(karta.getToken()),vPosjeta,muzejService.getById(vPosjeta.getIdMuzej()));
       // response.setHeader(headerKey, headerValue);
         
     //   List<User> listUsers = service.listAll();
        
        //UserPDFExporter exporter = new UserPDFExporter(karta,korisnikService.getById(karta.getToken()),vPosjeta,muzejService.getById(vPosjeta.getIdMuzej()));
        //exporter.emailPDF();
	}
	public Virtuelnakarta getById(Integer id)
	{
		return repo.findById(id).get();
	}
	public void delete(Integer id)
	{
		repo.deleteById(id);
	}
	public List<Virtuelnakarta> karteKorisnika(String token)
	{
		return repo.findByToken(token);
	}

}
