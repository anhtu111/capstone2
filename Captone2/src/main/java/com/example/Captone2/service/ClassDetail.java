package com.example.Captone2.service;


import com.example.Captone2.model.security.model.Class;
import com.example.Captone2.model.security.models_view.ClassAll;
import com.example.Captone2.respositories.ClassRepository;
import com.example.Captone2.respositories.UtilityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassDetail {

    private final ClassRepository classRepository;
    private final UtilityRepository utilityRepository;


    public ClassDetail(ClassRepository classRepository, UtilityRepository utilityRepository) {
        this.classRepository = classRepository;
        this.utilityRepository = utilityRepository;
    }

    public ClassAll getDetailClass(Long id){
        Class m = classRepository.findById(id).orElse(null);


        List<String> detailClass = utilityRepository.findByIdClassID(id);


        ClassAll rs = new ClassAll();

        rs.setClassAddress(m.getClassAddress());
        rs.setClassName(m.getClassName());
        rs.setDescription(m.getDescription());
        rs.setCapacity(m.getCapacity());
        rs.setPhone(m.getPhone());
        rs.setClassId(m.getClassId());
        rs.setStar(m.getStar());
        rs.setPrice(m.getPrice());
        rs.setCloseTime(m.getCloseTime());
        rs.setOpenTime(m.getOpenTime());
        rs.setClassImage(m.getClassImage());
        rs.setDetail(detailClass);
        rs.setDayOfWeek(m.getDayOfWeek());


        return rs;
    }
}
