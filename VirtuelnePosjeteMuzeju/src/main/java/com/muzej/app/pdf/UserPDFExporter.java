package com.muzej.app.pdf;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.muzej.app.login.Korisnik;
import com.muzej.app.login.KorisnikService;
import com.muzej.app.mail.Mail;
import com.muzej.app.muzej.Muzej;
import com.muzej.app.muzej.MuzejService;
import com.muzej.app.virtuelnakarta.Virtuelnakarta;
import com.muzej.app.virtuelnaposjeta.VirtuelnaPosjeta;
import com.muzej.app.virtuelnaposjeta.VirtuelnaPosjetaService;

public class UserPDFExporter {
    private Virtuelnakarta karta;
    Korisnik korisnik;
    VirtuelnaPosjeta vPosjeta;
    Muzej muzej;
     
    public UserPDFExporter(Virtuelnakarta karte,Korisnik korisnik,VirtuelnaPosjeta posjeta,Muzej muzej) {
    	System.out.println(karte.getToken());
    	System.out.println(korisnik.getEmail());
    	System.out.println(posjeta.getIdvirtuelnaposjeta());
    	System.out.println(muzej.getIdMuzej());
    	
        this.karta = karte;
        this.korisnik=korisnik;
        this.vPosjeta=posjeta;
        this.muzej=muzej;
        
		
		
		
    }
 
    public UserPDFExporter(List<String> logoviList) {
		// TODO Auto-generated constructor stub
	}

	private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(Color.BLUE);
        cell.setPadding(5);
         
        Font font = FontFactory.getFont(FontFactory.HELVETICA);
        font.setColor(Color.WHITE);
         
        cell.setPhrase(new Phrase("User ID", font));
         
        table.addCell(cell);
         
        cell.setPhrase(new Phrase("E-mail", font));
        table.addCell(cell);
         
        cell.setPhrase(new Phrase("Full Name", font));
        table.addCell(cell);
         
        cell.setPhrase(new Phrase("Roles", font));
        table.addCell(cell);
         
        cell.setPhrase(new Phrase("Enabled", font));
        table.addCell(cell);       
    }
     
    private void writeTableData(PdfPTable table,List<String>  logovi) {
        
    	for (String log : logovi) {
            table.addCell(log);
        }
            
        
    }
     
    public void export(HttpServletResponse response,List<String> logovi) throws DocumentException, IOException {
    	Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());
         
        document.open();
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        font.setSize(18);
        font.setColor(Color.BLUE);
         
        Paragraph p = new Paragraph("List of Users", font);
        p.setAlignment(Paragraph.ALIGN_CENTER);
         
        document.add(p);
         
        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100f);
        table.setWidths(new float[] {1.5f, 3.5f, 3.0f, 3.0f, 1.5f});
        table.setSpacingBefore(10);
         
        writeTableHeader(table);
        writeTableData(table,logovi);
         
        document.add(table);
         
        document.close();
         
    }
    	public Document generatePDF() {
    		String DIRECTORY = System.getProperty("user.home") + "/Downloads/uploads/";

    	    Document doc = new Document();
    	     try {
    	            File file = new File(DIRECTORY);
    	            FileOutputStream pdfFileout = new FileOutputStream(file);
    	            PdfWriter.getInstance(doc, pdfFileout);

    	            doc.addAuthor("TestABC");
    	            doc.addTitle("Aircraft Details");
    	            doc.open();


    	            Anchor anchor = new Anchor("Aircraft Report");
    	            anchor.setName("Aircraft Report");

    	            Chapter catPart = new Chapter(new Paragraph(anchor), 1);

    	            Paragraph para1 = new Paragraph();
    	            Section subCatPart = catPart.addSection(para1);
    	            para1.add("This is paragraph 1");

    	            Paragraph para2 = new Paragraph();
    	            para2.add("This is paragraph 2");


    	            doc.add(catPart);

    	            doc.close();


    	        } catch (Exception e) {
    	            e.printStackTrace();
    	        }
    	     return doc;
    	}
    	public void email() {
    	    String smtpHost = "smtp.gmail.com"; //replace this with a valid host
    	    int smtpPort = 587; //replace this with a valid port

    	    String sender = "mm2023012@gmail.com"; //replace this with a valid sender email address
    	    String recipient = korisnik.getEmail(); //replace this with a valid recipient email address
    	    String content = "Virtuelna karta"; //this will be the text of the email
    	    String subject = "Sadrzaj:"; //this will be the subject of the email

    	    Properties properties = new Properties();
    	    properties.put("mail.smtp.host", smtpHost);
    	    properties.put("mail.smtp.port", smtpPort);    
    	   // properties.put("mail.smtp.auth", mailAccount.isAuth());
			properties.put("mail.smtp.starttls.enable",true);
    	    Session session = Session.getDefaultInstance(properties, null);

    	    ByteArrayOutputStream outputStream = null;

    	    try {           
    	        //construct the text body part
    	        MimeBodyPart textBodyPart = new MimeBodyPart();
    	        textBodyPart.setText(content);

    	        //now write the PDF content to the output stream
    	        outputStream = new ByteArrayOutputStream();
    	        writePdf(outputStream);
    	        byte[] bytes = outputStream.toByteArray();

    	        //construct the pdf body part
    	        DataSource dataSource = new ByteArrayDataSource(bytes, "application/pdf");
    	        MimeBodyPart pdfBodyPart = new MimeBodyPart();
    	        pdfBodyPart.setDataHandler(new DataHandler(dataSource));
    	        pdfBodyPart.setFileName("karta.pdf");

    	        //construct the mime multi part
    	        MimeMultipart mimeMultipart = new MimeMultipart();
    	        mimeMultipart.addBodyPart(textBodyPart);
    	        mimeMultipart.addBodyPart(pdfBodyPart);

    	        //create the sender/recipient addresses
    	        InternetAddress iaSender = new InternetAddress(sender);
    	        InternetAddress iaRecipient = new InternetAddress(recipient);

    	        //construct the mime message
    	        MimeMessage mimeMessage = new MimeMessage(session);
    	        mimeMessage.setSender(iaSender);
    	        mimeMessage.setSubject(subject);
    	        mimeMessage.setRecipient(Message.RecipientType.TO, iaRecipient);
    	        mimeMessage.setContent(mimeMultipart);

    	        //send off the email
    	        Transport.send(mimeMessage);

    	        System.out.println("sent from " + sender + 
    	                ", to " + recipient + 
    	                "; server = " + smtpHost + ", port = " + smtpPort);         
    	    } catch(Exception ex) {
    	        ex.printStackTrace();
    	    } finally {
    	        //clean off
    	        if(null != outputStream) {
    	            try { outputStream.close(); outputStream = null; }
    	            catch(Exception ex) { }
    	        }
    	    }
    	}
    	public void writePdf(OutputStream outputStream) throws Exception {
    		
    	    Document doc = new Document();
    	    PdfWriter.getInstance(doc, outputStream);
    	   
    	    doc.addAuthor("Virtuelne posjete muzejima");
            doc.addTitle("Virtuelna karta "+karta.getIdvirtuelnakarta());
            doc.open();


            Anchor anchor = new Anchor("Aircraft Report");
            anchor.setName("Aircraft Report");

            Chapter catPart = new Chapter(new Paragraph(anchor), 1);

            Paragraph para1 = new Paragraph();
            Section subCatPart = catPart.addSection(para1);
            para1.add("Korisnik " + korisnik.getIme()+" "+korisnik.getPrezime() + " je uspjesno kupio kartu za sledecu prezentaciju:");

            Paragraph para2 = new Paragraph();
            para2.add("Muzej "+ muzej.getNaziv()+ " sa prezentacijom odrzanom "+ vPosjeta.getDatum()+" u  "+vPosjeta.getVrijemePocetka()+" casova. Prezentacija traje "+vPosjeta.getTrajanje()+" casa.");


            doc.add(catPart);
    	    Paragraph paragraph = new Paragraph();
    	    paragraph.add(new Chunk("Hvala!"));
    	    doc.add(paragraph);
    	    doc.close();
    	}
         
    
}