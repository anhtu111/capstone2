package com.example.Captone2.controller;

import com.example.Captone2.model.security.models_view.UserAll;
import com.example.Captone2.respositories.MembershipRepository;
import com.example.Captone2.service.UserFullService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/userAll")
public class UserAllController {

    @Autowired
    private UserFullService userFullService;

    @Autowired
    private MembershipRepository membershipRepository;

    @GetMapping("/{id}")
    public ResponseEntity<UserAll> getUserAll(@PathVariable Long id) {
        boolean exists = membershipRepository.existsById(id);
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin", "*").body(
                    userFullService.GetData(id)
            );



    }
        /*
        boolean exists = memberRepository.existsById(id);
        if(exists) {
            memberRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("ok", "Delete member successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find member to delete", "")
        );
    }
    */


}
