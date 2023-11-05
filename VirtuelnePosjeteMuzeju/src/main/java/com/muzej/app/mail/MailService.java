package com.muzej.app.mail;

import com.muzej.app.login.Korisnik;
import com.muzej.app.muzej.Muzej;
import com.muzej.app.virtuelnaposjeta.VirtuelnaPosjeta;

public interface MailService {
    public void sendEmail(Mail mail);
    public void sendEmailPDF(Mail mail,Korisnik korisnik,VirtuelnaPosjeta virtuelnaPosjeta,Muzej muzej);
}
