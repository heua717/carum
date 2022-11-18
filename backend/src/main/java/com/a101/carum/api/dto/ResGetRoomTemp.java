package com.a101.carum.api.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResGetRoomTemp {
    private Long id;
    private String name, emotionTag;
    private Integer background, frame;
}
