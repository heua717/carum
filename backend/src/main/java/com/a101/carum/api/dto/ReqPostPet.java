package com.a101.carum.api.dto;

import com.a101.carum.domain.pet.PetType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReqPostPet {
    private PetType type;
}
