package com.muzej.app.upload;



import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.muzej.app.Application;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;


@RestController
public class FileUploadController {
	public static final Logger logger = LoggerFactory.getLogger(Application.class);
	
	// define a location
    public static final String DIRECTORY = System.getProperty("user.home") + "/Downloads/uploads/";

    // Define a method to upload files
    @PostMapping("/upload/{idPosjeta}")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files")List<MultipartFile> multipartFiles,@PathVariable("idPosjeta")String idPosjeta) throws IOException {
    	logger.info(  "Upload fajla : "+ idPosjeta);
    	File directory = new File(String.valueOf(DIRECTORY));

    	if (!directory.exists()) {
    	        directory.mkdir();
    	       // if (!file.exists() && !checkEnoughDiskSpace()) {
    	       //     file.getParentFile().mkdir();
    	       //     file.createNewFile();
    	      //  }
    	}
        List<String> filenames = new ArrayList<>();
        for(MultipartFile file : multipartFiles) {
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            filename=idPosjeta+"_"+ filename;
            System.out.println("FILENAME: "+filename);
            Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();

            File targetFile = new File(DIRECTORY+filename);
            try(OutputStream outputStream = new FileOutputStream(targetFile))
            {
                IOUtils.copy(file.getInputStream(), outputStream);
            } catch (FileNotFoundException e) {
                System.out.println("1");
            } catch (IOException e) {
            	System.out.println("2");
            }
            filenames.add(filename);
        }
        return ResponseEntity.ok().body(filenames);
    }

    // Define a method to download files
    @GetMapping("download/{filename}")
    public ResponseEntity<Resource> downloadFiles(@PathVariable("filename") String filename) throws IOException {
    	logger.info(  "download fajla : "+ filename);
        Path filePath = get(DIRECTORY).toAbsolutePath().normalize().resolve(filename);
        if(!Files.exists(filePath)) {
            throw new FileNotFoundException(filename + " was not found on the server");
        }
        Resource resource = new UrlResource(filePath.toUri());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("File-Name", filename);
        httpHeaders.add(CONTENT_DISPOSITION, "attachment;File-Name=" + resource.getFilename());
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                .headers(httpHeaders).body(resource);
    }
    @DeleteMapping("delete/{filename}")
    public ResponseEntity<?> deleteFiles(@PathVariable("filename") String filename) throws IOException {
    	logger.info(   "Brisanje fajla : "+ filename);
        Path filePath = get(DIRECTORY).toAbsolutePath().normalize().resolve(filename);
        if(!Files.exists(filePath)) {
            throw new FileNotFoundException(filename + " was not found on the server");
        }
        File file=new File(DIRECTORY+filename);
        if(file.exists())
        	System.out.println("Postoji");
        if(file.delete())
        	return new ResponseEntity<>(HttpStatus.OK);
        else {
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
        
        //return ResponseEntity.ok();
    }

}