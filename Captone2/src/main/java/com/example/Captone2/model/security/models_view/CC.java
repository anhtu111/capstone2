package com.example.Captone2.model.security.models_view;

import java.util.List;

public class CC {

    Long ClassId;

    Long ClubId;

    String ClassName;

    String ClubName;


    String Phone;
    String Price;
    String OpenTime;
    String CloseTime;
    String ClassAddress;
    String DayOfWeek;
    String Description;

    String Star;
    String Capacity;

    List<String> ImageClass;

    List<String> ImageClub;

    public CC(){}

    public CC(Long classId, Long ClubId, String className, String clubName, String phone, String price, String openTime, String closeTime, String classAddress, String dayOfWeek, String description, String star, String capacity, List<String> imageClass, List<String> imageClub) {
        ClassId = classId;
        ClubId = ClubId;
        ClassName = className;
        ClubName = clubName;
        Phone = phone;
        Price = price;
        OpenTime = openTime;
        CloseTime = closeTime;
        ClassAddress = classAddress;
        DayOfWeek = dayOfWeek;
        Description = description;
        Star = star;
        Capacity = capacity;
        ImageClass = imageClass;
        ImageClub = imageClub;
    }

    public Long getClassId() {
        return ClassId;
    }

    public void setClassId(Long classId) {
        ClassId = classId;
    }

    public Long getClubId() {
        return ClubId;
    }

    public void setClubId(Long ClubId) {
        ClubId = ClubId;
    }

    public String getClassName() {
        return ClassName;
    }

    public void setClassName(String className) {
        ClassName = className;
    }

    public String getClubName() {
        return ClubName;
    }

    public void setClubName(String clubName) {
        ClubName = clubName;
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

    public String getClassAddress() {
        return ClassAddress;
    }

    public void setClassAddress(String classAddress) {
        ClassAddress = classAddress;
    }

    public String getDayOfWeek() {
        return DayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        DayOfWeek = dayOfWeek;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getStar() {
        return Star;
    }

    public void setStar(String star) {
        Star = star;
    }

    public String getCapacity() {
        return Capacity;
    }

    public void setCapacity(String capacity) {
        Capacity = capacity;
    }

    public List<String> getImageClass() {
        return ImageClass;
    }

    public void setImageClass(List<String> imageClass) {
        ImageClass = imageClass;
    }

    public List<String> getImageClub() {
        return ImageClub;
    }

    public void setImageClub(List<String> imageClub) {
        ImageClub = imageClub;
    }
}
