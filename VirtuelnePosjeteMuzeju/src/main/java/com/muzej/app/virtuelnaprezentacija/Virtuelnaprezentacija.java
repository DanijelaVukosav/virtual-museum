package com.muzej.app.virtuelnaprezentacija;

import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.muzej.app.virtuelnaposjeta.VirtuelnaPosjeta;

@Entity
public class Virtuelnaprezentacija 
{
	private int idvirtuelnaposjeta;
	private String video;
	private String slika1;
	private String slika2;
	private String slika3;
	private String slika4;
	private String slika5;
	private String slika6;
	private String slika7;
	private String slika8;
	private String slika9;
	private String slika10;
	
	
	public Virtuelnaprezentacija() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Virtuelnaprezentacija(int idvirtuelnaposjeta, String video, String slika1, String slika2, String slika3,
			String slika4, String slika5, String slika6, String slika7, String slika8, String slika9, String slika10) {
		super();
		this.idvirtuelnaposjeta = idvirtuelnaposjeta;
		this.video = video;
		this.slika1 = slika1;
		this.slika2 = slika2;
		this.slika3 = slika3;
		this.slika4 = slika4;
		this.slika5 = slika5;
		this.slika6 = slika6;
		this.slika7 = slika7;
		this.slika8 = slika8;
		this.slika9 = slika9;
		this.slika10 = slika10;
	}
	@Id
	public int getIdvirtuelnaposjeta() {
		return idvirtuelnaposjeta;
	}
	public void setIdvirtuelnaposjeta(int idvirtuelnaposjeta) {
		this.idvirtuelnaposjeta = idvirtuelnaposjeta;
	}
	public String getVideo() {
		return video;
	}
	public void setVideo(String video) {
		this.video = video;
	}
	public String getSlika1() {
		return slika1;
	}
	public void setSlika1(String slika1) {
		this.slika1 = slika1;
	}
	public String getSlika2() {
		return slika2;
	}
	public void setSlika2(String slika2) {
		this.slika2 = slika2;
	}
	public String getSlika3() {
		return slika3;
	}
	public void setSlika3(String slika3) {
		this.slika3 = slika3;
	}
	public String getSlika4() {
		return slika4;
	}
	public void setSlika4(String slika4) {
		this.slika4 = slika4;
	}
	public String getSlika5() {
		return slika5;
	}
	public void setSlika5(String slika5) {
		this.slika5 = slika5;
	}
	public String getSlika6() {
		return slika6;
	}
	public void setSlika6(String slika6) {
		this.slika6 = slika6;
	}
	public String getSlika7() {
		return slika7;
	}
	public void setSlika7(String slika7) {
		this.slika7 = slika7;
	}
	public String getSlika8() {
		return slika8;
	}
	public void setSlika8(String slika8) {
		this.slika8 = slika8;
	}
	public String getSlika9() {
		return slika9;
	}
	public void setSlika9(String slika9) {
		this.slika9 = slika9;
	}
	public String getSlika10() {
		return slika10;
	}
	public void setSlika10(String slika10) {
		this.slika10 = slika10;
	}
	

}
