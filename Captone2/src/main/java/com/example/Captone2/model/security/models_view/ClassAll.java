package com.example.Captone2.model.security.models_view;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


public class ClassAll {

    Long classId;

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

    List<String> detail;

    public ClassAll(){}

    public ClassAll(Long classId, String className, String dayOfWeek, String phone, String price, String star, String description, String classAddress, String openTime, String closeTime, String capacity, String classImage, List<String> detail) {
        this.classId = classId;
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
        this.detail = detail;
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
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

    public List<String> getDetail() {
        return detail;
    }

    public void setDetail(List<String> detail) {
        this.detail = detail;
    }
}
