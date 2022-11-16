package com.a101.carum.api.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResGetDiaryList {
    private List<ResGetDiary> DiaryList = new ArrayList<>();
}
