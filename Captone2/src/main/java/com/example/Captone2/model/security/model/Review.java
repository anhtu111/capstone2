package com.example.Captone2.model.security.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity

public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long IdReview;


    Long Rate;
    String Comment;
    String Time;


    @ManyToOne
    @JoinColumn(name = "MemberId")
    private Member memberR;
    @ManyToOne
    @JoinColumn(name = "RoomId")
    private Room roomR;
    public Review(){}

    public Review(Long idReview, Long rate, String comment, String time) {
        IdReview = idReview;
        Rate = rate;
        Comment = comment;
        Time = time;
    }



    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return "Review{" +
                "IdReview= " + IdReview +
                "Rate= " + Rate +
                ",Comment= " + Comment +
                ",Time=" + Time +
                "}";
    }
}
