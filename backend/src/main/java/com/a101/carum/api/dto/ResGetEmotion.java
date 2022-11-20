package com.a101.carum.api.dto;

import com.a101.carum.domain.question.FaceType;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResGetEmotion {
    private FaceType result;
    private Long diaryAll;
    private Long diaryCount;
}
