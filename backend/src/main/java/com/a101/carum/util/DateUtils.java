package com.a101.carum.util;

import com.a101.carum.api.dto.ReqGetDiaryList;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Calendar;

@Component
public class DateUtils {
    public LocalDateTime startDateTime(LocalDate localDate){
        return LocalDateTime.of(localDate, LocalTime.of(0,0,0));
    }

    public LocalDateTime endDateTime(LocalDate localDate){
        return LocalDateTime.of(localDate, LocalTime.of(23,59,59));
    }

    public LocalDate startDate(ReqGetDiaryList reqGetDiaryList){
        return LocalDate.of(reqGetDiaryList.getYear(),reqGetDiaryList.getMonth(), 1);
    }

    public LocalDate getDate(ReqGetDiaryList reqGetDiaryList){
        return LocalDate.of(reqGetDiaryList.getYear(),reqGetDiaryList.getMonth(), reqGetDiaryList.getDay());
    }

}
