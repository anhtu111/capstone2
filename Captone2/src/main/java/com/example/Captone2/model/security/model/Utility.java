package com.example.Captone2.model.security.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@Entity
public class Utility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long utilityId;

    @Column(name = "ClassID")
    Long classId;
    String detail;


    public Utility(Long utilityId, Long classId, String detail) {
        this.utilityId = utilityId;
        this.classId = classId;
        this.detail = detail;
    }

    public Utility(){}


    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return "utility{" +
               "utilityId=" + utilityId +
                "classId=" + classId +
                "detail=" + detail +
                "}";
    }
}
