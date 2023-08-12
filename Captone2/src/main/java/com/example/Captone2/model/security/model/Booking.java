package com.example.Captone2.model.security.model;

import lombok.Builder;

import javax.persistence.*;

@Entity

public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long BookingId;
    String DateFrom;
    String DateTo;
    String Price;
    @ManyToOne
    @JoinColumn(name = "ClassId")
    private Class aClass;
    @ManyToOne
    @JoinColumn(name = "RoomId")
    private Room roomB;
    @ManyToOne
    @JoinColumn(name = "MemberId")
    private Member memberB;


    public Booking(){}

    public Booking(Long bookingId,Boolean isBooking,String dateFrom,String dateTo,String price){
        BookingId = bookingId;
        DateFrom = dateFrom;
        DateTo = dateTo;
        Price = price;
    }
    public Class getaClass() {
        return aClass;
    }

    public void setaClass(Class aClass) {
        this.aClass = aClass;
    }

    public Room getRoom() {
        return roomB;
    }

    public void setRoom(Room room) {
        this.roomB = room;
    }

    public Member getMember() {
        return memberB;
    }

    public void setMember(Member member) {
        this.memberB = member;
    }
    public Long getBookingId() {
        return BookingId;
    }

    public void setBookingId(Long bookingId) {
        BookingId = bookingId;
    }

    public String getDateFrom() {
        return DateFrom;
    }

    public void setDateFrom(String dateFrom) {
        DateFrom = dateFrom;
    }

    public String getDateTo() {
        return DateTo;
    }

    public void setDateTo(String dateTo) {
        DateTo = dateTo;
    }

    public String getPrice() {
        return Price;
    }

    public void setPrice(String price) {
        Price = price;
    }

    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return "Booking{" +
                "BookingID= " + BookingId +
                "ClassID= " + aClass +
                ",RoomID= " + roomB +
                ",MemberID=" + memberB +
                ",DateFrom=  " + DateFrom +
                ",DateTo= " + DateTo +
                ",Price=  " + Price +
                "}";
    }
}
