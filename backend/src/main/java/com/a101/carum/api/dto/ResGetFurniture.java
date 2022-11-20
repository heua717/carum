package com.a101.carum.api.dto;

import com.a101.carum.domain.furniture.FurnitureType;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResGetFurniture {
    private Long id;
    private String name,resource,image;
    private Long price;
    private FurnitureType type;
    private boolean have;
}
