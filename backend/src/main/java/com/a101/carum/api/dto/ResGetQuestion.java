package com.a101.carum.api.dto;

import com.a101.carum.domain.question.FaceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResGetQuestion {
    private String content;
    private FaceType face;
}
