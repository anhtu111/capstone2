package com.example.Captone2.controller;

import com.example.Captone2.model.security.ResponseObject;
import com.example.Captone2.model.security.model.Images;
import com.example.Captone2.model.security.model.Membership;
import com.example.Captone2.model.security.models_view.MembershipView;
import com.example.Captone2.respositories.ImagesRepository;
import com.example.Captone2.respositories.MembershipRepository;
import com.example.Captone2.service.MembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/membership")
public class MembershipController {

    @Autowired
    private MembershipRepository membershipRepository;

    @Autowired
    private ImagesRepository imagesRepository;

    @Autowired
    private MembershipService membershipService;

    public MembershipController(MembershipRepository membershipRepository, ImagesRepository imagesRepository) {
        this.membershipRepository = membershipRepository;
        this.imagesRepository = imagesRepository;
    }
    @CrossOrigin("http://localhost:3001")
    @GetMapping("/images")
    public ResponseEntity<List<Images>> getAll1() {
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                imagesRepository.findAll()
        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<MembershipView> getMembershipView(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin", "*").body(
                membershipService.getMembershipView(id)
        );
    }

    @PostMapping("/insertImage")
    ResponseEntity<ResponseObject> insertImages (@RequestBody Images newImages){
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("Ok", "Insert Images successfully", imagesRepository.save(newImages))
        );
    }
    
    @DeleteMapping("deleteImage/{id}")
    ResponseEntity<ResponseObject> deleteImages(@PathVariable int id) {
        boolean exists = imagesRepository.existsById(id);
        if(exists) {
            imagesRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("ok", "Delete product successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find product to delete", "")
        );
    }

    @GetMapping("")
    public ResponseEntity<List<Membership>> getMembership() {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                membershipRepository.findAll()
        );
    }
/*
    @GetMapping("/{id}")
    public ResponseEntity<Membership> getMembershipId(@PathVariable Long id) {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                membershipRepository.findById(id).get()
        );
    }
*/
    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertMembership (@RequestBody Membership newC){
        // content.setId(locationRepositiry.findByLoctionId());
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("Ok", "Insert Member successfully", membershipRepository.save(newC))
        );
    }
    @PutMapping("put/{id}")
    ResponseEntity<ResponseObject> updateMember(@RequestBody Membership newMembership, @PathVariable Long id) {
        Membership updateMembership = membershipRepository.findById(id)
                .map(Membership -> {
                    //    Member.setMemberId(newMember.getMemberId());
                    Membership.setMembershipName(newMembership.getMembershipName());
                    Membership.setClassAddress(newMembership.getClassAddress());
                    Membership.setClassID(newMembership.getClassID());
                    Membership.setDayOfWeek(newMembership.getDayOfWeek());
                    Membership.setRegisterDate(newMembership.getRegisterDate());
                    Membership.setEndDate(newMembership.getEndDate());
                    Membership.setExpireDate(newMembership.getExpireDate());

                    return membershipRepository.save(Membership);
                }).orElseGet(() -> {
                    newMembership.setMembershipID(id);
                    return membershipRepository.save(newMembership);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Update Membership successfully", updateMembership)
        );
    }


    @DeleteMapping("delete/{id}")
    ResponseEntity deleteMembership(@PathVariable Long id) {
        boolean exists = membershipRepository.existsById(id);
        if(exists) {
            membershipRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("ok", "Delete Membership successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find Member to delete", "")
        );
    }

}
