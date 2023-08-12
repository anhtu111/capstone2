package com.example.Captone2.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleResponse {

    private long Schedule_ID;

    private String DateOfWeek;
    private String Time;
}
