package com.muzej.app.pdf;


import static java.nio.file.Paths.get;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
 
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.lowagie.text.Anchor;
import com.lowagie.text.Chapter;
import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Section;
import com.lowagie.text.pdf.PdfWriter;
import com.muzej.app.Application;
import com.muzej.app.login.Korisnik;
import com.muzej.app.muzej.Muzej;
import com.muzej.app.virtuelnaposjeta.VirtuelnaPosjeta;
 
@Controller
public class ExportPDFController {
	public static final Logger logger = LoggerFactory.getLogger(Application.class);
	
	private static String DIRECTORY=System.getProperty("user.dir");
         
    @GetMapping("/export/pdf")
    public void exportToPDF(HttpServletResponse response) throws DocumentException, IOException {
        response.setContentType("application/pdf");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());
         
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=users_" + currentDateTime + ".pdf";
        response.setHeader(headerKey, headerValue);
         
        List<String> logoviList=Files.readAllLines(Paths.get("logfile.log"));
         
        UserPDFExporter exporter = new UserPDFExporter(logoviList);
        exporter.export(response,logoviList);
         
    }
    @GetMapping("/export1/pdf")
    public ResponseEntity<Resource> downloadFiles() throws Exception {
    	logger.info(  "download fajla : ");
        FileOutputStream fOutputStream=new FileOutputStream(new File(DIRECTORY+File.separator+"log.pdf"));
        writePdf(fOutputStream);
        Path filePath = get(DIRECTORY).toAbsolutePath().normalize().resolve("log.pdf");;
        if(!Files.exists(filePath)) {
            throw new FileNotFoundException("a.pdf" + " was not found on the server");
        }
        Resource resource = new UrlResource(filePath.toUri());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("File-Name", "log.pdf");
        httpHeaders.add(CONTENT_DISPOSITION, "attachment;File-Name=" + resource.getFilename());
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                .headers(httpHeaders).body(resource);
    }
public void writePdf(OutputStream outputStream) throws Exception {
		
	    Document doc = new Document();
	    PdfWriter.getInstance(doc, outputStream);
	   
	    doc.addAuthor("Logovi");
        doc.addTitle("Logovi");
        doc.open();


        Anchor anchor = new Anchor("Aircraft Report");
        anchor.setName("Virtuelna karta");

        Chapter catPart = new Chapter(new Paragraph(anchor), 1);

        Paragraph para1 = new Paragraph();
        Section subCatPart = catPart.addSection(para1);
        List<String> logoviList=Files.readAllLines(Paths.get("logfile.log"));
        for(String log:logoviList)
        	para1.add(log);

        Paragraph para2 = new Paragraph();
        para2.add("KRaj");
        Section subCatPart2 = catPart.addSection(para2);

        doc.add(catPart);
	    Paragraph paragraph = new Paragraph();
	    paragraph.add(new Chunk("Kraj!"));
	    doc.add(paragraph);
	    doc.close();
	}
}