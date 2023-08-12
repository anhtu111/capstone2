package com.example.Captone2.model.security.model;

import javax.persistence.*;

@Entity
public class Images {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String image;

    @Column(name = "MembershipID")
    Long MembershipID;

    @Column(name = "ClassID")
    Long ClassID;

    @Column(name = "ClubId")
    Long ClubId;






    public Images(){}

    public Images(Long classID, Long clubId) {
        ClassID = classID;
        ClubId = clubId;
    }

    public Long getClassID() {
        return ClassID;
    }

    public void setClassID(Long classID) {
        ClassID = classID;
    }

    public Long getClubId() {
        return ClubId;
    }

    public void setClubId(Long clubId) {
        ClubId = clubId;
    }

    public Images(Integer id, String image, Long membershipID) {
        this.id = id;
        this.image = image;
        MembershipID = membershipID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getMembershipID() {
        return MembershipID;
    }

    public void setMembershipID(Long membershipID) {
        MembershipID = membershipID;
    }
}
