
package com.example.Captone2.service;

import com.example.Captone2.model.security.model.Membership;
import com.example.Captone2.model.security.models_view.MembershipView;
import com.example.Captone2.respositories.ImagesRepository;
import com.example.Captone2.respositories.MembershipRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MembershipService {
    private final MembershipRepository membershipRepository;
    private final ImagesRepository imagesRepository;

    public MembershipService(MembershipRepository membershipRepository, ImagesRepository imagesRepository) {
        this.membershipRepository = membershipRepository;
        this.imagesRepository = imagesRepository;
    }

    // Hiển thị full hình ảnh trong Membership
    public MembershipView getMembershipView(Long id){
        Membership m = membershipRepository.findById(id).orElse(null);


        List<String> images = imagesRepository.findByIdMembershipID(id);

        MembershipView rs = new MembershipView();

        rs.setImage(images);
        rs.setMembershipID(id);
        rs.setClassAddress(m.getClassAddress());
        rs.setMembershipName(m.getMembershipName());
        rs.setEndDate(m.getEndDate());
        rs.setDayOfWeek(m.getDayOfWeek());
        rs.setRegisterDate(m.getRegisterDate());
        rs.setClassID(m.getClassID());
        rs.setExpireDate(m.getExpireDate());

        return rs;
    }

}


