package com.a101.carum.api.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResGetRoom {
    private Long id;
    private String name;
    private List<String> emotionTag;
    private Integer background, frame;
}
