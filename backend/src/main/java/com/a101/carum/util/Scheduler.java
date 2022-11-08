package com.a101.carum.util;

import com.a101.carum.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@AllArgsConstructor
public class Scheduler {

    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;
    private final HistoryRepository historyRepository;
    private final PetRepository petRepository;
    private final PetDailyRepository petDailyRepository;

    @Scheduled(cron = "1 0 0 1 * *")
    public void initializeRoom(){
        LocalDate date = LocalDate.now().minusDays(1);
        Integer year = date.getYear();
        Integer month = date.getMonthValue();
    }
}
