package com.a101.carum.api.dto;

import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@ToString
public class ReqPostDiary {

    private String content;

    private List<String> emotionTag;

    private String background;

}
