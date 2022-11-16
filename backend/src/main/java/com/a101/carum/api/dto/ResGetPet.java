package com.a101.carum.api.dto;

import com.a101.carum.domain.pet.PetType;
import com.a101.carum.domain.question.FaceType;
import lombok.*;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResGetPet {
    private Long id;
    private PetType type;
    private FaceType face;
    private Integer appearance;
    private Map<String, Long> emotionMap;
}
