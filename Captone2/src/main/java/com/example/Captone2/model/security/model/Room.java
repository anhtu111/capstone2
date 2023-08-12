package com.example.Captone2.model.security.model;

import lombok.Builder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity

public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long RoomId;

    String RoomName;
    String RoomType;
    Boolean IsBooking;
    String Price;
    @ManyToOne
    @JoinColumn(name = "ClassId")
    private Class ClassR;
    @OneToMany(mappedBy= "roomB")
    private List<Booking> bookings ;
    @OneToMany(mappedBy= "roomR")
    private List<Review> reviewList;
    public Room(){}

    public Room(Long roomId, Long classID, String roomName, String roomType, Boolean isBooking, String price) {
        RoomId = roomId;
        RoomName = roomName;
        RoomType = roomType;
        IsBooking = isBooking;
        Price = price;
    }


    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public List<Review> getReviews() {
        return reviewList;
    }

    public void setReviews(List<Review> reviews) {
        this.reviewList = reviews;
    }

    public Class getClassR() {
        return ClassR;
    }

    public void setClassR(Class classR) {
        ClassR = classR;
    }

    public Long getRoomId() {
        return RoomId;
    }

    public void setRoomId(Long roomId) {
        RoomId = roomId;
    }


    public String getRoomName() {
        return RoomName;
    }

    public void setRoomName(String roomName) {
        RoomName = roomName;
    }

    public String getRoomType() {
        return RoomType;
    }

    public void setRoomType(String roomType) {
        RoomType = roomType;
    }

    public Boolean getBooking() {
        return IsBooking;
    }

    public void setBooking(Boolean booking) {
        IsBooking = booking;
    }

    public String getPrice() {
        return Price;
    }

    public void setPrice(String price) {
        Price = price;
    }
    public String toString() {
        // TODO Auto-generated method stub
        return "Room{" +
                "RoomID= " + RoomId +
                ",RoomName= " + RoomName +
                ",RoomType= " + RoomType +
                ",IsBooking=  " + IsBooking +
                ",Price= " + Price +
                "}";
    }
}
