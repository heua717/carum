package com.a101.carum.api.dto;

import com.a101.carum.domain.interior.ActionType;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReqPutRoomDetail {
    Long interiorId, furnitureId;
    Float x,y,z,rotX,rotY,rotZ;
    ActionType action;
}
