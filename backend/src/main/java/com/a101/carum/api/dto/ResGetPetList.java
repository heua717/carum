package com.a101.carum.api.dto;

import com.a101.carum.domain.pet.PetType;
import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResGetPetList {
    private List<ResGetPet> petList;
}
