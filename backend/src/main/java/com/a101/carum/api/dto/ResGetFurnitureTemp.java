package com.a101.carum.api.dto;

import com.a101.carum.domain.furniture.Furniture;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResGetFurnitureTemp {
    private Furniture furniture;
    private Long count;
}
