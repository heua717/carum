package com.a101.carum.util;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@AllArgsConstructor
public class Scheduler {


    @Scheduled(cron = "1 0 0 1 * *")
    public void initializeRoom(){
        LocalDate date = LocalDate.now().minusDays(1);
        Integer year = date.getYear();
        Integer month = date.getMonthValue();
    }
}
