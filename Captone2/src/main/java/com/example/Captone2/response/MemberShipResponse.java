package com.example.Captone2.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberShipResponse {
    Long MembershipID;

    Long ClassID;
    String MembershipName;
    String ClassAddress;
    String RegisterDate;
    String EndDate;
    String DayOfWeek;
    String ExpireDate;


}
