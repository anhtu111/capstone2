package com.example.Captone2.dao;

import com.example.Captone2.model.security.DAOUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserDao extends CrudRepository<DAOUser, Long> {
	
	DAOUser findByUsername(String username);
	
}