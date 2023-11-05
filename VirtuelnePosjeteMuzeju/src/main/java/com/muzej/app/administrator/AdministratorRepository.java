package com.muzej.app.administrator;

import org.springframework.data.jpa.repository.JpaRepository;


public interface AdministratorRepository extends  JpaRepository<Administrator, String> {
	Administrator findByUsername(String username);

}
