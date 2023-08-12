package com.example.Captone2.model.security.models_view;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;

//@Entity
public class MembershipView {
    Long MembershipID;

    Long ClassID;
    String MembershipName;
    List<String> Image;
    String ClassAddress;
    String RegisterDate;
    String EndDate;
    String DayOfWeek;
    String ExpireDate;

    public MembershipView(){}

    public MembershipView(Long membershipID, Long classID, String membershipName, List<String> image, String classAddress, String registerDate, String endDate, String dayOfWeek, String expireDate) {
        MembershipID = membershipID;

        ClassID = classID;
        MembershipName = membershipName;
        Image = image;
        ClassAddress = classAddress;
        RegisterDate = registerDate;
        EndDate = endDate;
        DayOfWeek = dayOfWeek;
        ExpireDate = expireDate;
    }

    public Long getMembershipID() {
        return MembershipID;
    }

    public void setMembershipID(Long membershipID) {
        MembershipID = membershipID;
    }


    public Long getClassID() {
        return ClassID;
    }

    public void setClassID(Long classID) {
        ClassID = classID;
    }

    public String getMembershipName() {
        return MembershipName;
    }

    public void setMembershipName(String membershipName) {
        MembershipName = membershipName;
    }

    public List<String> getImage() {
        return Image;
    }

    public void setImage(List<String> image) {
        Image = image;
    }

    public String getClassAddress() {
        return ClassAddress;
    }

    public void setClassAddress(String classAddress) {
        ClassAddress = classAddress;
    }

    public String getRegisterDate() {
        return RegisterDate;
    }

    public void setRegisterDate(String registerDate) {
        RegisterDate = registerDate;
    }

    public String getEndDate() {
        return EndDate;
    }

    public void setEndDate(String endDate) {
        EndDate = endDate;
    }

    public String getDayOfWeek() {
        return DayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        DayOfWeek = dayOfWeek;
    }

    public String getExpireDate() {
        return ExpireDate;
    }

    public void setExpireDate(String expireDate) {
        ExpireDate = expireDate;
    }

}
