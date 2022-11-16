package com.a101.carum.api.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResGetRoomTemp {
    Long id;
    String name, emotionTag;
    Integer background, frame;
}
