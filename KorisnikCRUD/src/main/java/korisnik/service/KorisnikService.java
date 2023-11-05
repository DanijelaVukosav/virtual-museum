package korisnik.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import java.util.Arrays;
import java.util.List;

import com.google.gson.Gson;

import korisnik.beans.KorisnikBean;

public class KorisnikService {
	private List<KorisnikBean> korisnici;
	

	public List<KorisnikBean> getKorisnici() {
		return korisnici;
	}
	public void setKorisnici(List<KorisnikBean> korisnici) {
		this.korisnici = korisnici;
	}
	
	public KorisnikService() 
	{
	}
	public void ucitaj() {};
	public void ucitajKorisnike()
	{
		try {

            URL url = new URL("http://localhost:8080/administratori");//your url i.e fetch data from .
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            if (conn.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP Error code : "
                        + conn.getResponseCode());
            }
            InputStreamReader in = new InputStreamReader(conn.getInputStream());
            BufferedReader br = new BufferedReader(in);
            String nizString="";
            String output;
            while ((output = br.readLine()) != null) {
                System.out.println(output);
                nizString+=output;
            }
            conn.disconnect();
            

    		try {
    			Gson gson = new Gson();
    			List<KorisnikBean> data = Arrays.asList(gson.fromJson(nizString, KorisnikBean[].class));
    			if (data!=null)
    			{
    				korisnici=data;
    				System.out.println("ukpnoKorisnika: "+korisnici.size());
    			}
    			in.close();
    		} catch (IOException e) {
    			e.printStackTrace();
    		}

        } catch (Exception e) 
		{
        	
        }
		
	}

}
