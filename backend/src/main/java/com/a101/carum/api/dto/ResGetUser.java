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
    private String userId, nickName, phone;
    private LocalDate birth;
    private Long money;
    private ResGetRoom mainRoom;
    private PetType petType;
    private FaceType dailyFace;
    private Integer dailyColor;
    private boolean todayDiary;
}
