package com.example.Captone2.model.security.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.ws.rs.GET;

@Getter
@Setter
@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long paymentId;

    String time;
    String name;
    Long price;

    String decription;

    public Payment(){}

    public Payment(Long paymentId, String time, String name, Long price, String decription) {
        this.paymentId = paymentId;
        this.time = time;
        this.name = name;
        this.price = price;
        this.decription = decription;
    }
}
