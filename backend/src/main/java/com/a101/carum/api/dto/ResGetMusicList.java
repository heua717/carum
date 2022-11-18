package com.a101.carum.api.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResGetMusicList {
    private List<ResGetMusic> musicList;
    private Long musicCount;
}
