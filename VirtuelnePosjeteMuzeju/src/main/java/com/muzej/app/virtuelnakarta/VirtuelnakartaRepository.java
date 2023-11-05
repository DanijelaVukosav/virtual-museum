package com.muzej.app.virtuelnakarta;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VirtuelnakartaRepository extends JpaRepository<Virtuelnakarta, Integer> {
	List<Virtuelnakarta> findByToken(String token);

}
