package com.example.Captone2.response;

import com.example.Captone2.model.security.model.Booking;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponse {
    Long MemberId;
    String Name;
    String Gender;
    String Age;
    String Phone;
    String DayOfBirth;
    String Image;
    Long AccountId;
    List<MemberShipResponse> memberShipResponses;

    List<ScheduleResponse> scheduleResponses;

    List<BookingResponse> bookingResponses;

    List<ReviewsReponse> reviewsReponses;

    List<EventResponse> eventResponses;
}
