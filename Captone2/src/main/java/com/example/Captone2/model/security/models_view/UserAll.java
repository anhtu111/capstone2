package com.example.Captone2.model.security.models_view;


import com.example.Captone2.model.security.models_view.MembershipView;

import java.util.List;

public class UserAll {
    private Long UserId ;

    private Long MemberId;
    private String Name;
    private String Gender;
    private String Age;
    private String Phone;
    private String DayOfBirth;

    private MembershipView membershipView;

    private String username;

    private String role;

    private String token;

    public UserAll(){}

    public UserAll(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserAll(String username, String role) {
        this.username = username;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public UserAll(Long userId, Long memberId, String name, String gender, String age, String phone, String dayOfBirth, MembershipView membershipView) {
        UserId = userId;
        MemberId = memberId;
        Name = name;
        Gender = gender;
        Age = age;
        Phone = phone;
        DayOfBirth = dayOfBirth;
        this.membershipView = membershipView;
    }

    public Long getUserId() {
        return UserId;
    }

    public void setUserId(Long userId) {
        UserId = userId;
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

    public MembershipView getMembershipView() {
        return membershipView;
    }

    public void setMembershipView(MembershipView membershipView) {
        this.membershipView = membershipView;
    }
}
