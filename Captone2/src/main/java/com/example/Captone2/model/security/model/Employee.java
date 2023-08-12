package com.example.Captone2.model.security.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long    EmployeeId;

    String Name;
    String Gender;
    String Age;
    String Phone;
    String DayOfBirth;
    String Email;
    String Degree;
    String Experience;

    Long AccountId;

    String Image;
    public Employee() {
    }

    public Employee(long employeeId, String name, String gender, String age, String phone, String dayOfBirth, String email, String degree, String experience, Long accountId, String image) {
        EmployeeId = employeeId;
        Name = name;
        Gender = gender;
        Age = age;
        Phone = phone;
        DayOfBirth = dayOfBirth;
        Email = email;
        Degree = degree;
        Experience = experience;
        AccountId = accountId;
        Image = image;
    }

    public String getImage() {
        return Image;
    }

    public void setImage(String image) {
        Image = image;
    }

    public long getEmployeeId() {
        return EmployeeId;
    }

    public void setEmployeeId(long employeeId) {
        EmployeeId = employeeId;
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

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getDegree() {
        return Degree;
    }

    public void setDegree(String degree) {
        Degree = degree;
    }

    public String getExperience() {
        return Experience;
    }

    public void setExperience(String experience) {
        Experience = experience;
    }

    public Long getAccountId() { return AccountId; }

    public void setAccountId(Long accountId) { AccountId = accountId; }

    @Override
    public String toString() {
        return "Employee{" +
                "EmployeeId=" + EmployeeId +
                ", Name='" + Name +
                ", Gender='" + Gender +
                ", Age='" + Age +
                ", Phone='" + Phone +
                ", DayOfBirth='" + DayOfBirth +
                ", Email='" + Email +
                ", Degree='" + Degree +
                ", Experience='" + Experience +
                ", Image='" + Image +
                '}';
    }
}
