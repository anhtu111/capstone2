package com.example.Captone2.controller;

import com.example.Captone2.model.security.ResponseObject;
import com.example.Captone2.model.security.model.Review;
import com.example.Captone2.model.security.models_view.review_detail;
import com.example.Captone2.respositories.ReviewRepository;
import com.example.Captone2.service.review_detail_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("review")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;


    @Autowired
    private review_detail_Service review_detail_service;

    @GetMapping("reviewDetail/{id}")
    public ResponseEntity<review_detail> getDetail(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin", "*").body(
                review_detail_service.getReviewDetail(id)
        );
    }


    @GetMapping("")
    public ResponseEntity<List<Review>> getReview() {
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                reviewRepository.findAll()
        );
    }





    @GetMapping("/{id}")
    public ResponseEntity get(@PathVariable Long id) {
        boolean exists = reviewRepository.existsById(id);
        if(exists) {
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin", "*").body(
                    reviewRepository.findById(id).get()
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find id review ", "")
        );
    }

    @PutMapping("put/{id}")
    ResponseEntity<ResponseObject> updateReview(@RequestBody Review newReview, @PathVariable Long id) {
        boolean exists = reviewRepository.existsById(id);
        if(exists){
            Review updateReview = reviewRepository.findById(id)
                    .map(Review -> {


                        Review.setRate(newReview.getRate());
                        Review.setComment(newReview.getComment());
                    //    Review.setTime(new Date());
                        Review.setTime(newReview.getTime());

                        return reviewRepository.save(Review);
                    }).orElseGet(() -> {
                        newReview.setIdReview(id);
                        return reviewRepository.save(newReview);
                    });
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Update review successfully", newReview)
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find id review to update", "")
        );

    }

    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertReview (@RequestBody Review newC){
        newC.setTime(String.valueOf(new Date()));
        newC.setComment(newC.getComment());
        newC.setRate(newC.getRate());
        return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("Ok", "Insert Member successfully", reviewRepository.save(newC))
        );
    }

    @DeleteMapping("delete/{id}")
    ResponseEntity deleteReview(@PathVariable Long id) {
        boolean exists = reviewRepository.existsById(id);
        if(exists) {
            reviewRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).header("Access-Control-Allow-Origin","*").body(
                    new ResponseObject("ok", "Delete review successfully", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Access-Control-Allow-Origin","*").body(
                new ResponseObject("failed", "Cannot find review to delete", "")
        );
    }
}
