package com.example.Captone2.model.security.model;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity

public class Sport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long sportId;

    String sportName;
    String sportImage;
    String sportGroup;

    @OneToMany(mappedBy= "sportC")
    private List<Class> classList = new ArrayList<>();
    public Sport(){}

    public Sport(Long sportId, String sportName, String sportImage, String sportGroup) {
        this.sportId = sportId;
        this.sportName = sportName;
        this.sportImage = sportImage;
        this.sportGroup = sportGroup;
    }

    public Long getSportId() {
        return sportId;
    }

    public void setSportId(Long sportId) {
        this.sportId = sportId;
    }

    public String getSportName() {
        return sportName;
    }

    public void setSportName(String sportName) {
        this.sportName = sportName;
    }

    public String getSportImage() {
        return sportImage;
    }

    public void setSportImage(String sportImage) {
        this.sportImage = sportImage;
    }

    public String getSportGroup() {
        return sportGroup;
    }

    public void setSportGroup(String sportGroup) {
        this.sportGroup = sportGroup;
    }

    public List<Class> getClassList() {
        return classList;
    }

    public void setClassList(List<Class> classList) {
        this.classList = classList;
    }

    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return "Spot{" +
                "sportId= " + sportId +
                "sportName= " + sportName +
                ",sportImage= " + sportImage +
                ",sportGroup=" + sportGroup +
                "}";
    }
}
