package com.a101.carum.api.dto;

import com.a101.carum.domain.furniture.FurnitureType;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResGetFurniture {
    Long id;
    String name,resource;
    Long price;
    FurnitureType type;
    boolean have;
}
