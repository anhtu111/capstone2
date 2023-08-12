package com.example.Captone2.respositories;


import com.example.Captone2.model.security.DAOUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<DAOUser, Long> {

    @Query("select m from DAOUser m where m.id=:id")
    DAOUser findByDAOUserId(Long id);

    @Query("select m from DAOUser m where m.username=:username")
    DAOUser getByUsername(String username);
}
