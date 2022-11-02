package com.a101.carum.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
public class ReqGetDiaryList {

    private int year;
    private int month;
    private int day;

}
