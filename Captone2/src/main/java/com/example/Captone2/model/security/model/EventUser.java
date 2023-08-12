package com.example.Captone2.model.security.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long EvenMembertld ;

    Long Memberld;
    String EvenName;
    String startTime;
    String doneTime;
    String Decription;

    String image;

    @ManyToMany(mappedBy = "eventUserList")
    private List<Member> memberList = new ArrayList<>();


    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return "Event{" +
                "EvenMembertld= " + EvenMembertld +
                "Memberld= " + Memberld +
                ",EvenName=" + EvenName +
                ",startTime= " + startTime +
                ",doneTime=  " + doneTime +
                ",Decription=  " + Decription +
                "}";
    }
}
