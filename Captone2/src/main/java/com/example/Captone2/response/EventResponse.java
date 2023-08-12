package com.example.Captone2.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventResponse {

    Long EvenMembertld ;

    Long Memberld;
    String EvenName;
    String startTime;
    String doneTime;
    String Decription;

    String image;
}
