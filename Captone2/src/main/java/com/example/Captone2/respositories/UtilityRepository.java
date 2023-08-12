package com.example.Captone2.respositories;

import com.example.Captone2.model.security.model.Utility;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface UtilityRepository extends JpaRepository<Utility, Long> {

    Utility getById(Long id);

    @Query("select m.detail from Utility m where m.classId=:classId ")
    List<String> findByIdClassID(Long classId);




}
