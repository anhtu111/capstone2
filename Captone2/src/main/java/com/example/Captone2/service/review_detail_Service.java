package com.example.Captone2.service;

import com.example.Captone2.model.security.model.Review;
import com.example.Captone2.model.security.models_view.review_detail;
import com.example.Captone2.respositories.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class review_detail_Service {

    private final ReviewRepository reviewRepository;

    public review_detail_Service(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }


    public review_detail getReviewDetail(Long id){

        Review r = reviewRepository.findById(id).orElse(null);
        review_detail rv = new review_detail();
        rv.setIdReview(r.getIdReview());
        rv.setComment(r.getComment());
        rv.setRate(r.getRate());
        rv.setTime(String.valueOf(Instant.now()));


        Review re = new Review();
//        Date time = re.getTime();
//        long current = new Date().getTime();
//        if (time.getTime() - current <60000) {
//            rv.setDetail("1 pphut truoc");
//        }
//        else if( time.getTime() - current >121000 ){
//
//        }





        return rv;
    }
}
