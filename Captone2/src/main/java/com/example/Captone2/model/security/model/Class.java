package com.example.Captone2.model.security.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity

public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long ClassId;

    String ClassName;
    String DayOfWeek;
    String Phone;
    String Price;

    String Star;

    String Description;

    String ClassAddress;
    String OpenTime;
    String CloseTime;
    String Capacity;

    String ClassImage;

    String Team;

    @ManyToOne
    @JoinColumn(name = "sportId")
    private Sport sportC;
    @OneToMany(mappedBy= "ClassR")
    private List<Room> roomList = new ArrayList<>();
    @OneToMany(mappedBy= "aClass")
    private List<Booking> bookingList = new ArrayList<>();
    public Class(){}

    public Class(Long classId, String className, String dayOfWeek, String phone, String price, String star, String description, String classAddress, String openTime, String closeTime, String capacity, String classImage, String team) {
        ClassId = classId;
        ClassName = className;
        DayOfWeek = dayOfWeek;
        Phone = phone;
        Price = price;
        Star = star;
        Description = description;
        ClassAddress = classAddress;
        OpenTime = openTime;
        CloseTime = closeTime;
        Capacity = capacity;
        ClassImage = classImage;
        Team = team;
    }

    public List<Booking> getBookingList() {
        return bookingList;
    }

    public void setBookingList(List<Booking> bookingList) {
        this.bookingList = bookingList;
    }

    public List<Room> getRoomList() {
        return roomList;
    }

    public void setRoomList(List<Room> roomList) {
        this.roomList = roomList;
    }

    public Long getClassId() {
        return ClassId;
    }

    public void setClassId(Long classId) {
        ClassId = classId;
    }

    public String getClassName() {
        return ClassName;
    }

    public void setClassName(String className) {
        ClassName = className;
    }

    public String getDayOfWeek() {
        return DayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        DayOfWeek = dayOfWeek;
    }

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public String getPrice() {
        return Price;
    }

    public void setPrice(String price) {
        Price = price;
    }

    public String getStar() {
        return Star;
    }

    public void setStar(String star) {
        Star = star;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getClassAddress() {
        return ClassAddress;
    }

    public void setClassAddress(String classAddress) {
        ClassAddress = classAddress;
    }

    public String getOpenTime() {
        return OpenTime;
    }

    public void setOpenTime(String openTime) {
        OpenTime = openTime;
    }

    public String getCloseTime() {
        return CloseTime;
    }

    public void setCloseTime(String closeTime) {
        CloseTime = closeTime;
    }

    public String getCapacity() {
        return Capacity;
    }

    public void setCapacity(String capacity) {
        Capacity = capacity;
    }

    public String getClassImage() {
        return ClassImage;
    }

    public void setClassImage(String classImage) {
        ClassImage = classImage;
    }

    public String getTeam() {
        return Team;
    }

    public void setTeam(String team) {
        Team = team;
    }
//
//    public Sport getSportC() {
//        return sportC;
//    }
//
//    public void setSportC(Sport sportC) {
//        this.sportC = sportC;
//    }

    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return "Class{" +
                "ClassId= " + ClassId +
                ",ClassName= " + ClassName +
                ",Phone= " + Phone +
                ",Price=  " + Price +
                ",OpenTime=  " + OpenTime +
                ",CloseTime= " + CloseTime +
                ",ClassAddress= " + ClassAddress +
                ",DayOfWeek=  " + DayOfWeek +
                ",Description=  " + Description +
                ",Start=  " + Star +
                ",Capacity=  " + Capacity +
                ",ClassImage=  " + ClassImage +
                "}";
    }
}
