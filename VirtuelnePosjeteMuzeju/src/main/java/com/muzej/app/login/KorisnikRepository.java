package com.muzej.app.login;

import org.springframework.data.jpa.repository.JpaRepository;


public interface KorisnikRepository extends  JpaRepository<Korisnik, String> {
	Korisnik findByUsername(String username);

}
