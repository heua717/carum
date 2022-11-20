package com.a101.carum.api.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReqGetPet {
    private Integer year;
    private Integer month;
}
