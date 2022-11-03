package com.a101.carum.api.dto;

import com.a101.carum.domain.question.FaceType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResGetPetDaily {
    private FaceType face;
    private Integer color;
}
