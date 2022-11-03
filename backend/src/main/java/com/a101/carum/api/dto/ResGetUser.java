package com.a101.carum.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResGetUser {
    String userId, nickName, phone;
    LocalDate birth;
    Long money;
    ResGetRoom mainRoom;
    boolean todayDiary;
}
