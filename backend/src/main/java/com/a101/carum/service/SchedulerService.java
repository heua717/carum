package com.a101.carum.service;

import com.a101.carum.domain.history.History;
import com.a101.carum.domain.pet.Pet;
import com.a101.carum.domain.pet.PetDaily;
import com.a101.carum.domain.question.FaceType;
import com.a101.carum.domain.user.User;
import com.a101.carum.domain.user.UserDetail;
import com.a101.carum.repository.*;
import com.a101.carum.util.PetUtils;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class SchedulerService {

    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;
    private final HistoryRepository historyRepository;
    private final PetRepository petRepository;
    private final CustomPetDailyRepository petDailyRepository;
    private final String[] emotions = {"HAPPY", "ANGRY", "SAD", "SURPRISED", "WORRY", "PEACE"};

    @Transactional
    @Scheduled(cron = "1 0 0 1 * *")
    public void initializeRoom(){
        LocalDate date = LocalDate.now().minusDays(1);
        Integer year = date.getYear();
        Integer month = date.getMonthValue();

        List<User> userList = userRepository.findAllByIsDeleted(false);

        for(User user: userList) {
            UserDetail userDetail = userDetailRepository.findByUser(user)
                    .orElseThrow(() -> new NullPointerException("User 정보가 손상되었습니다."));

            if(userDetail.getPetType() == null){
                continue;
            }

            History history = historyRepository.findTop1ByYearAndMonthAndUserOrderByCountDesc(year, month, user);
            if(history == null) {
                continue;
            }

            String emotion = history.getEmotion();

            List<String> tags = new ArrayList<>();
            tags.add(emotion);
            PetDaily petDaily = petDailyRepository.getPetDaily(tags, userDetail.getPetType());

            Integer monthlyColor = petDaily.Color(petDaily.getColor());
            FaceType monthlyFace = petDaily.getFace();

            Pet pet = Pet.builder()
                    .appearance(monthlyColor)
                    .face(monthlyFace)
                    .month(month)
                    .year(year)
                    .type(userDetail.getPetType())
                    .user(user)
                    .build();

            petRepository.save(pet);

            // 매 달 들어왔는지 확인하기 위하는 부분
            userDetail.updatePetType(null);

            for(String e: emotions){
                historyRepository.save(History.builder()
                        .user(user)
                        .year(LocalDate.now().getYear())
                        .month(LocalDate.now().getMonthValue())
                        .emotion(e)
                        .count(0L)
                        .build());
            }
        }
    }
}
