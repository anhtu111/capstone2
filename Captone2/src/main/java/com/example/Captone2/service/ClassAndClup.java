package com.example.Captone2.service;

import com.example.Captone2.model.security.model.Class;
import com.example.Captone2.model.security.models_view.CC;
import com.example.Captone2.respositories.ClassRepository;
import com.example.Captone2.respositories.ImagesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClassAndClup {

    private final ClassRepository classRepository;
    private final ImagesRepository imagesRepository;

    public ClassAndClup(ClassRepository classRepository, ImagesRepository imagesRepository) {
        this.classRepository = classRepository;
        this.imagesRepository = imagesRepository;
    }

    // Hiển thị full hình ảnh trong Membership
//    public CC getClassClub(Long id){
////        Class m = classRepository.findById(id).orElse(null);
////
////
////        List<String> imagesClass = imagesRepository.findByIdClassID(id);
////
////        List<String> imagesClub = imagesRepository.findByIdClubId(id);
////
////        CC rs = new CC();
////
////        rs.setClassName(m.getClassName());
////       // rs.setClubName(m.getClubName());
////        rs.setPhone(m.getPhone());
////        rs.setPrice(m.getPrice());
////        rs.setImageClass(imagesClass);
////        rs.setImageClub(imagesClub);
////        rs.setOpenTime(m.getOpenTime());
////        rs.setCloseTime(m.getCloseTime());
////        rs.setClassAddress(m.getClassAddress());
////        rs.setDayOfWeek(m.getDayOfWeek());
////        rs.setDescription(m.getDescription());
////        rs.setStar(m.getStar());
////        rs.setCapacity(m.getCapacity());
////       // rs.setClubId(m.getClubId());
////        rs.setClassId(m.getClassId());
////
////        return rs;
//    }
}
