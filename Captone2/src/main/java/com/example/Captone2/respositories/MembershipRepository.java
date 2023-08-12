package com.example.Captone2.respositories;

import com.example.Captone2.model.security.model.Membership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MembershipRepository extends JpaRepository<Membership, Long> {

    Membership getById(Long id);
}
