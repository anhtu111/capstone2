package com.example.Captone2.respositories;

import com.example.Captone2.common.enums.RoleName;
import com.example.Captone2.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(RoleName roleClient);
}
