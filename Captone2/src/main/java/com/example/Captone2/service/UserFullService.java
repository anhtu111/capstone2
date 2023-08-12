package com.example.Captone2.service;

import com.example.Captone2.model.security.DAOUser;
import com.example.Captone2.model.security.model.Member;
import com.example.Captone2.model.security.models_view.UserAll;

import com.example.Captone2.respositories.MemberRepository;
import com.example.Captone2.respositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserFullService {


    @Autowired
    private MembershipService membershipService;

    private final MemberRepository memberRepository;

    private final UserRepository userRepository;





    public UserFullService(MemberRepository memberRepository, UserRepository userRepository) {
        this.memberRepository = memberRepository;
        this.userRepository = userRepository;

    }


    public UserAll GetData(Long id) {

        Member mb = memberRepository.findByMemberId(id);

        DAOUser ac = userRepository.findByDAOUserId(id);


        UserAll api = new UserAll();



        api.setUsername(ac.getUsername());
        //api.setRole(ac.getRole());

        api.setUserId(id);
        api.setMemberId(mb.getMemberId());
        api.setAge(mb.getAge());
        api.setDayOfBirth(mb.getDayOfBirth());
        api.setGender(mb.getGender());
        api.setName(mb.getName());
        api.setPhone(mb.getPhone());

        api.setMembershipView(membershipService.getMembershipView(id));


        return api;

    }
}
