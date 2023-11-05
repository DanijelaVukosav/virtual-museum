package com.muzej.app.mail;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.lowagie.text.Anchor;
import com.lowagie.text.Chapter;
import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Section;
import com.lowagie.text.pdf.PdfWriter;
import com.muzej.app.login.Korisnik;
import com.muzej.app.muzej.Muzej;
import com.muzej.app.virtuelnaposjeta.VirtuelnaPosjeta;
 
 
@Service("mailService")
public class MailServiceImpl implements MailService {
 
    @Autowired
    JavaMailSender mailSender;
 
    public void sendEmail(Mail mail) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
 
        try {
 
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
 
            mimeMessageHelper.setSubject(mail.getMailSubject());
            mimeMessageHelper.setFrom(new InternetAddress(mail.getMailFrom(), "virtuelneposjete.com"));
            mimeMessageHelper.setTo(mail.getMailTo());
            mimeMessageHelper.setText(mail.getMailContent());
            
 
            mailSender.send(mimeMessageHelper.getMimeMessage());
 
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }
    public void sendEmailPDF(Mail mail, Korisnik korisnik, VirtuelnaPosjeta virtuelnaPosjeta,Muzej muzej)  {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        ByteArrayOutputStream outputStream = null;
        try {
        	 MimeBodyPart textBodyPart = new MimeBodyPart();
 	        textBodyPart.setText(mail.getMailSubject());

 	        //now write the PDF content to the output stream
 	        outputStream = new ByteArrayOutputStream();
 	        writePdf(outputStream,korisnik,virtuelnaPosjeta,muzej);
 	        byte[] bytes = outputStream.toByteArray();

 	        File file=new File("a.pdf");
 	        FileOutputStream fOutputStream=new FileOutputStream(file);
 	        fOutputStream.write(bytes);
 	        fOutputStream.flush();
 	        fOutputStream.close();
 	       DataSource source = new FileDataSource("a.pdf");  
 	        MimeBodyPart pdfBodyPart = new MimeBodyPart();
 	        pdfBodyPart.setDataHandler(new DataHandler(source));
 	        pdfBodyPart.setFileName("karta.pdf");

 	        //construct the mime multi part
 	        MimeMultipart mimeMultipart = new MimeMultipart();
 	        mimeMultipart.addBodyPart(textBodyPart);
 	        mimeMultipart.addBodyPart(pdfBodyPart);

 	        

 	        //construct the mime message
 	     //   MimeMessage mimeMessage = new MimeMessage(session);
 	     //   mimeMessage.setSender(iaSender);
 	    //    mimeMessage.setSubject(subject);
 	       // mimeMessage.setRecipient(Message.RecipientType.TO, iaRecipient);
 	        mimeMessage.setContent(mimeMultipart);

 	        //send off the email
 	       // Transport.send(mimeMessage);

 	       
 
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
 
            mimeMessageHelper.setSubject(mail.getMailSubject());
            mimeMessageHelper.setFrom(new InternetAddress(mail.getMailFrom(), "virtuelneposjete.com"));
            mimeMessageHelper.setTo(korisnik.getEmail()); //mail.getMailTo()
            mimeMessageHelper.addAttachment("karta.pdf",source);
            mimeMessageHelper.setText("Karta za virtuelu posjetu muzeju");
            
            
 
            mailSender.send(mimeMessageHelper.getMimeMessage());
 
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
    public void writePdf(OutputStream outputStream, Korisnik korisnik,VirtuelnaPosjeta virtuelnaPosjeta,Muzej muzej) throws Exception {
		
	    Document doc = new Document();
	    PdfWriter.getInstance(doc, outputStream);
	   
	    doc.addAuthor("Virtuelne posjete muzejima");
        doc.addTitle("Virtuelna karta ");
        doc.open();


        Anchor anchor = new Anchor("Aircraft Report");
        anchor.setName("Virtuelna karta");

        Chapter catPart = new Chapter(new Paragraph(anchor), 1);

        Paragraph para1 = new Paragraph();
        Section subCatPart = catPart.addSection(para1);
        para1.add("Korisnik " + korisnik.getIme()+" "+korisnik.getPrezime() + " je uspjesno kupio kartu za sledecu prezentaciju:");
      //  para1.add("Korisnik wwwwwwwww");

        Paragraph para2 = new Paragraph();
        para2.add("Muzej "+ muzej.getNaziv()+ " sa prezentacijom odrzanom "+ virtuelnaPosjeta.getDatum()+" u  "+virtuelnaPosjeta.getVrijemePocetka()+" casova. Prezentacija traje "+virtuelnaPosjeta.getTrajanje()+" h.");
        Section subCatPart2 = catPart.addSection(para2);

        doc.add(catPart);
	    Paragraph paragraph = new Paragraph();
	    paragraph.add(new Chunk("Hvala!"));
	    doc.add(paragraph);
	    doc.close();
	}
 
}