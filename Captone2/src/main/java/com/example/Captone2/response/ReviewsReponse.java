package com.example.Captone2.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewsReponse {

    Long IdReview;


    Long Rate;
    String Comment;
    String Time;
}
