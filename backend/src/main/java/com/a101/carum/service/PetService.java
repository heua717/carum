package com.a101.carum.service;

import com.a101.carum.api.dto.ReqPostPet;
import com.a101.carum.api.dto.ResGetPetDaily;
import com.a101.carum.domain.diary.Diary;
import com.a101.carum.domain.pet.Pet;
import com.a101.carum.domain.user.User;
import com.a101.carum.repository.DiaryRepository;
import com.a101.carum.repository.PetRepository;
import com.a101.carum.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@AllArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;


    public void createPet(ReqPostPet reqPostPet, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        Pet pet = Pet.builder()
                .year(LocalDateTime.now().getYear())
                .month(LocalDateTime.now().getMonthValue())
                .type(reqPostPet.getType())
                .user(user)
                .build();
        petRepository.save(pet);

    }

    public ResGetPetDaily getPetDaily(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new NullPointerException("User를 찾을 수 없습니다."));
        Diary diary = diaryRepository.findByCreateDateBetweenAndUser(LocalDateTime.of(
                LocalDate.now(), LocalTime.of(0,0,0))
                ,LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59)),user).orElseThrow(()-> new NullPointerException("오늘 작성된 diary가 없습니다."));
        String[] str = diary.getEmotionTag().split(",");
        ResGetPetDaily resGetPetDaily;
        if(str.length==1){

        }

        return null;
    }
}
