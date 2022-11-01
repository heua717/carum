package com.a101.carum.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReqPutRoom {
    List<String> background;
    List<ReqPutRoomDetail> interiorList;
}
