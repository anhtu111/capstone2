package com.example.Captone2.respositories;

import com.example.Captone2.model.security.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberRepository extends JpaRepository<Member, Long> {
   // Member getByMemberId(Long MemberId);

    @Query("select m from Member m where m.MemberId=:MemberId")
    Member findByMemberId(Long MemberId);

}
