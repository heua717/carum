package com.a101.carum.service;

import com.a101.carum.api.dto.ReqPostPet;
import com.a101.carum.api.dto.ResGetPetDaily;
import com.a101.carum.domain.pet.Pet;
import com.a101.carum.domain.question.FaceType;
import com.a101.carum.domain.user.User;
import com.a101.carum.domain.user.UserDetail;
import com.a101.carum.repository.DiaryRepository;
import com.a101.carum.repository.PetRepository;
import com.a101.carum.repository.UserDetailRepository;
import com.a101.carum.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;
    private final UserDetailRepository userDetailRepository;


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
        User user = userRepository.findById(userId).orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        UserDetail userDetail = userDetailRepository.findByUser(user).orElseThrow(() -> new NullPointerException("User정보가 손상 되었습니다."));
        if (userDetail.getLastDiary().equals(LocalDate.now())) {
            return ResGetPetDaily.builder()
                    .face(userDetail.getDailyFace())
                    .color(userDetail.getDailyColor())
                    .build();
        } else {
            return ResGetPetDaily.builder()
                    .color(0)
                    .face(FaceType.NORMAL)
                    .build();


        }


    }
}
