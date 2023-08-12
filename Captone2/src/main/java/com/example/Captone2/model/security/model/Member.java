package com.example.Captone2.model.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity

public class Member implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long MemberId;

    String Name;
    String Gender;
    String Age;
    String Phone;
    String DayOfBirth;

    String Image;

    Long AccountId;

   // @JsonIgnore
    @ManyToMany
    @JoinTable(name = "Member_Membership",
                joinColumns = @JoinColumn(name ="MemberId"),
                inverseJoinColumns = @JoinColumn(name = "MembershipID"))
    private List<Membership> membershipList ;


    @ManyToMany
    @JoinTable(name = "Member_Schedule",
            joinColumns = @JoinColumn(name ="MemberId"),
            inverseJoinColumns = @JoinColumn(name = "Schedule_ID"))
    private List<Schedule> scheduleList ;
    @ManyToMany
    @JoinTable(name = "Member_EventUser",
            joinColumns = @JoinColumn(name ="MemberId"),
            inverseJoinColumns = @JoinColumn(name = "EvenMembertld"))
    private List<EventUser> eventUserList ;


    @OneToMany(mappedBy= "memberB")
    private List<Booking> bookingList ;
    @OneToMany(mappedBy= "memberR")
    private List<Review> reviews ;


    public Member(){}

    public Member(Long memberId, String name, String gender, String age, String phone, String dayOfBirth, String image, Long accountId) {
        MemberId = memberId;
        Name = name;
        Gender = gender;
        Age = age;
        Phone = phone;
        DayOfBirth = dayOfBirth;
        Image = image;
        AccountId = accountId;
    }

    public List<Booking> getBookingList() {
        return bookingList;
    }

    public void setBookingList(List<Booking> bookingList) {
        this.bookingList = bookingList;
    }

    public List<Schedule> getScheduleList() {
        return scheduleList;
    }

    public void setScheduleList(List<Schedule> scheduleList) {
        this.scheduleList = scheduleList;
    }

    public String getImage() {
        return Image;
    }

    public void setImage(String image) {
        Image = image;
    }

    public Long getMemberId() {
        return MemberId;
    }

    public void setMemberId(Long MemberId) {
        this.MemberId = MemberId;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getGender() {
        return Gender;
    }

    public void setGender(String gender) {
        Gender = gender;
    }

    public String getAge() {
        return Age;
    }

    public void setAge(String age) {
        Age = age;
    }

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public String getDayOfBirth() {
        return DayOfBirth;
    }

    public void setDayOfBirth(String dayOfBirth) {
        DayOfBirth = dayOfBirth;
    }

    public Long getAccountId() {
        return AccountId;
    }

    public void setAccountId(Long accountId) {
        AccountId = accountId;
    }

    public List<Membership> getMembershipList() {
        return membershipList;
    }

    public void setMembershipList(List<Membership> membershipList) {
        this.membershipList = membershipList;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<EventUser> getEventUserList() {
        return eventUserList;
    }

    public void setEventUserList(List<EventUser> eventUserList) {
        this.eventUserList = eventUserList;
    }

    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return "Menber{" +
                "MemberId= " + MemberId +
                ",Name= " + Name +
                ",Gender= " + Gender +
                ",Age=  " + Age +
                ",Phone= " + Phone +
                ",DayOfBirth= " + DayOfBirth +
                // ",AccountId=  " + City +
                "}";
    }


}
