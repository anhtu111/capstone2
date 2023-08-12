package com.example.Captone2.controller;

import com.example.Captone2.model.security.ResponseObject;
import com.example.Captone2.model.security.model.Utility;
import com.example.Captone2.respositories.UtilityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/utility")
public class UtilityController {

    @Autowired
    private UtilityRepository utilityRepository;


    @GetMapping("")
    public ResponseEntity<List<Utility>> getUtility() {
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin", "*").body(
                utilityRepository.findAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utility> get(@PathVariable Long id) {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                utilityRepository.findById(id).get()
        );
    }

    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertUtility (@RequestBody Utility newUtility){
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("Ok", "Insert utility successfully", utilityRepository.save(newUtility))
        );
    }
    @DeleteMapping("delete/{id}")
    ResponseEntity<ResponseObject> deleteUtility(@PathVariable Long id) {
        boolean exists = utilityRepository.existsById(id);
        if(exists) {
            utilityRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("ok", "Delete Utility successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find Utility to delete", "")
        );
    }
}
