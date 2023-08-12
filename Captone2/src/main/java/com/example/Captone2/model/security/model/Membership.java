package com.example.Captone2.model.security.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long MembershipID;

    Long ClassID;
    String MembershipName;
    String ClassAddress;
    String RegisterDate;
    String EndDate;
    String DayOfWeek;
    String ExpireDate;


    @ManyToMany(mappedBy = "membershipList")
    private List<Member> members = new ArrayList<>();

    public Membership(){}

    public Membership(Long membershipID, Long classID, String membershipName, String classAddress, String registerDate, String endDate, String dayOfWeek, String expireDate, List<Member> members) {
        MembershipID = membershipID;
        ClassID = classID;
        MembershipName = membershipName;
        ClassAddress = classAddress;
        RegisterDate = registerDate;
        EndDate = endDate;
        DayOfWeek = dayOfWeek;
        ExpireDate = expireDate;
        this.members = members;
    }

    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return "Membership{" +
                "MembershipID= " + MembershipID +
                ",ClassID= " + ClassID +
                ",MembershipName=  " + MembershipName +
                ",ClassAddress=  " + ClassAddress +
                ",RegisterDate= " + RegisterDate +
                ",EndDate=  " + EndDate +
                ",DayOfWeek=  " + DayOfWeek +
                ",ExpireDate=  " + ExpireDate +
                "}";
    }
}
