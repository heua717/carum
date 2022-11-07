package com.a101.carum.api.dto;

import com.a101.carum.domain.pet.PetType;
import com.a101.carum.domain.question.FaceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResGetUser {
    String userId, nickName, phone;
    LocalDate birth;
    Long money;
    ResGetRoom mainRoom;
    PetType petType;
    FaceType dailyFace;
    Integer dailyColor;
    boolean todayDiary;
}
