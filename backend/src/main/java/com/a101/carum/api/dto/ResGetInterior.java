package com.a101.carum.api.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResGetInterior {
    Long interiorId, furnitureId;
    String resource;
    Float x,y,z,rotX,rotY,rotZ;
}
