package com.example.Captone2.controller;


import com.example.Captone2.model.security.ResponseObject;
import com.example.Captone2.model.security.model.Sport;
import com.example.Captone2.respositories.SportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("sport")
public class SportController {

    @Autowired
    private SportRepository sportRepository;

    @GetMapping("")
    public ResponseEntity<List<Sport>> getSport() {
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                sportRepository.findAll()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sport> get(@PathVariable Long id) {

        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                sportRepository.findById(id).get()
        );
    }

    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertSprot (@RequestBody Sport newC){
        // content.setId(locationRepositiry.findByLoctionId());
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("Ok", "Insert Sport successfully", sportRepository.save(newC))
        );
    }

    @PutMapping("put/{id}")
    ResponseEntity<ResponseObject> updateSport(@RequestBody Sport newSport, @PathVariable Long id) {

        boolean exists = sportRepository.existsById(id);
        if(exists) {
            Sport updateSport = sportRepository.findById(id)
                    .map(Sport -> {

                        Sport.setSportImage(newSport.getSportImage());
                        Sport.setSportGroup(newSport.getSportGroup());
                        Sport.setSportName(newSport.getSportName());

                        return sportRepository.save(Sport);
                    }).orElseGet(() -> {
                        newSport.setSportId(id);
                        return sportRepository.save(newSport);
                    });
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Update Event successfully", newSport)
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find Sport by id ", "")
        );

    }
    @DeleteMapping("delete/{id}")
    ResponseEntity deleteBooking(@PathVariable Long id) {
        boolean exists = sportRepository.existsById(id);
        if(exists) {
            sportRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("ok", "Delete Sport successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find Sport to delete", "")
        );
    }
}
