package com.example.Captone2.controller;

import com.example.Captone2.model.security.ResponseObject;
import com.example.Captone2.model.security.model.Booking;
import com.example.Captone2.respositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("booking")
public class BookingController {
        @Autowired
        private BookingRepository bookingRepository;

        @GetMapping("")
        public ResponseEntity<List<Booking>> getBooking() {
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    bookingRepository.findAll()
            );
        }

        @GetMapping("/{id}")
        public ResponseEntity<Booking> get(@PathVariable Long id) {

            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    bookingRepository.findById(id).get()
            );
        }

        @PostMapping("/insert")
        ResponseEntity<ResponseObject> insertBooking (@RequestBody Booking newC){
            // content.setId(locationRepositiry.findByLoctionId());
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("Ok", "Insert Booking successfully", bookingRepository.save(newC))
            );
        }
        @DeleteMapping("delete/{id}")
        ResponseEntity deleteBooking(@PathVariable Long id) {
            boolean exists = bookingRepository.existsById(id);
            if(exists) {
                bookingRepository.deleteById(id);
                return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                        new ResponseObject("ok", "Delete Booking successfully", "")
                );
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("failed", "Cannot find Booking to delete", "")
            );
        }
}

