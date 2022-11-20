package com.a101.carum.api.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResGetInterior {
    private Long interiorId, furnitureId;
    private String resource;
    private Float x,y,z,rotX,rotY,rotZ;
}
