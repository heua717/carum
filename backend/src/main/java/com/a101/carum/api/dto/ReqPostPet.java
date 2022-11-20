package com.a101.carum.api.dto;

import com.a101.carum.domain.pet.PetType;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReqPostPet {
    private PetType type;
}
