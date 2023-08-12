package com.example.Captone2.controller;

import com.example.Captone2.model.security.ResponseObject;
import com.example.Captone2.model.security.model.Class;
import com.example.Captone2.model.security.models_view.ClassAll;
import com.example.Captone2.respositories.ClassRepository;
import com.example.Captone2.service.ClassDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/class")
public class ClassController {

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private ClassDetail classDetail;

    @GetMapping("")
    public ResponseEntity<List<Class>> getMember() {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                classRepository.findAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Class> get(@PathVariable Long id) {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                classRepository.findById(id).get()
        );
    }
//
    @GetMapping("classDetail/{id}")
    public ResponseEntity<ClassAll> getClassAndClubView(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin", "*").body(
                classDetail.getDetailClass(id)
        );
    }



    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertContent (@RequestBody Class newC){
        // content.setId(locationRepositiry.findByLoctionId());
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("Ok", "Insert Class successfully", classRepository.save(newC))
        );
    }

    @PutMapping("put/{id}")
    ResponseEntity<ResponseObject> updateClas(@RequestBody Class newClass, @PathVariable Long id) {
        Class updateClass = classRepository.findById(id)
                .map(Class -> {

                    Class.setClassName(newClass.getClassName());

                    Class.setClassAddress(newClass.getClassAddress());


                    Class.setDescription(newClass.getDescription());
                    Class.setDayOfWeek(newClass.getDayOfWeek());
                    Class.setPhone(newClass.getPhone());
                    Class.setCloseTime(newClass.getCloseTime());
                    Class.setPrice(newClass.getPrice());
                    Class.setOpenTime(newClass.getOpenTime());
                    Class.setCapacity(newClass.getCapacity());
                    Class.setStar(newClass.getStar());
                    Class.setClassImage(newClass.getClassImage());
                    Class.setTeam(newClass.getTeam());


                    return classRepository.save(Class);
                }).orElseGet(() -> {
                    newClass.setClassId(id);
                    return classRepository.save(newClass);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Update Class successfully", updateClass)
        );
    }

    @DeleteMapping("delete/{id}")
    ResponseEntity deleteMember(@PathVariable Long id) {
        boolean exists = classRepository.existsById(id);
        if(exists) {
            classRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("ok", "Delete Class successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find Class to delete", "")
        );
    }

}
