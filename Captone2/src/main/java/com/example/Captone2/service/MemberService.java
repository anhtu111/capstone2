package com.example.Captone2.service;

import com.example.Captone2.common.enums.RoleName;
import com.example.Captone2.entity.Role;
import com.example.Captone2.model.security.DAOUser;
import com.example.Captone2.model.security.UserDTO;
import com.example.Captone2.model.security.model.Booking;
import com.example.Captone2.model.security.model.Member;
import com.example.Captone2.model.security.model.Membership;
import com.example.Captone2.model.security.model.Schedule;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class MemberService {



    Schedule schedule;
    Membership membership;
    Booking booking;

    public DAOUser save( Schedule schedule, Membership membership, Booking booking) {

        Member member = new Member();
        member.setName(member.getName());


      return null;

    }










}
