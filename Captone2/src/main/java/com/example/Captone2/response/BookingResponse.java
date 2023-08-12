package com.example.Captone2.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse {

    Long BookingId;
    String DateFrom;
    String DateTo;
    String Price;
}
