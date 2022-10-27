package com.a101.carum.api.dto;

import com.a101.carum.domain.furniture.FurnitureType;
import lombok.*;

@Data
@NoArgsConstructor
public class ResGetFurniture {
    Long furnitureId;
    String name,resource;
    Integer price;
    FurnitureType type;
    boolean have;

    public void ResGetFurnitureList(Long id, String name, String resource, Integer price, FurnitureType type, boolean have){
        this.furnitureId = id;
        this.name = name;
        this.resource = resource;
        this.price = price;
        this.type = type;
        this.have = have;
    }
}
