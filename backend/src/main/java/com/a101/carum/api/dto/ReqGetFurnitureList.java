package com.a101.carum.api.dto;

import com.a101.carum.domain.furniture.FurnitureType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReqGetFurnitureList {
    String keyword;
    FurnitureType type;
}
