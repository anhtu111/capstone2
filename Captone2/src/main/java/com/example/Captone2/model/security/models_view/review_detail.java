package com.example.Captone2.model.security.models_view;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class review_detail {

    Long IdReview;
    Long Rate;
    String Comment;
    String Time;
    String Detail;

    public review_detail(){}

    public review_detail(Long idReview, Long rate, String comment, String time, String detail) {
        IdReview = idReview;
        Rate = rate;
        Comment = comment;
        Time = time;
        Detail = detail;
    }
}
