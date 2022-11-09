package com.a101.carum.service;

import com.a101.carum.api.dto.*;
import com.a101.carum.common.exception.UnUpdatableException;
import com.a101.carum.domain.history.History;
import com.a101.carum.domain.pet.Pet;
import com.a101.carum.domain.question.FaceType;
import com.a101.carum.domain.user.User;
import com.a101.carum.domain.user.UserDetail;
import com.a101.carum.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;
    private final UserDetailRepository userDetailRepository;
    private final HistoryRepository historyRepository;
    private static String[] emotions = {"HAPPY", "SAD", "ANGRY", "WORRY", "SURPRISE", "PEACE"};
    private final Integer MAX_MONTH = 12;
    @Transactional
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

    @Transactional
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

    @Transactional
    public void updatePet(ReqPostPet reqPostPet, Long id) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        UserDetail userDetail = userDetailRepository.findByUser(user)
                .orElseThrow(() -> new NullPointerException("User 정보가 손상되었습니다."));

        // 이 달에 일기를 쓴적이 없어야 수정 가능
        if (!inMonth(userDetail.getLastDiary())){
            userDetail.updatePetType(reqPostPet.getType());
        } else {
            throw new UnUpdatableException("이 달의 펫을 수정하실 수 없습니다.");
        }
    }

    public boolean inMonth(LocalDate lastDiary){
        return lastDiary.getMonthValue() == LocalDate.now().getMonthValue();
    }


    @Transactional
    public ResGetPet getPet(Long id, Long petId) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));

        Pet pet = petRepository.findByIdAndUser(petId, user)
                .orElseThrow(() -> new NullPointerException("Pet이 없습니다."));

        return createResGetPet(pet, LocalDate.now().getYear(), LocalDate.now().getMonthValue());
    }

    @Transactional
    public ResGetPetList getPet(Integer year, Long id) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        List<Pet> petListTemp = petRepository.findAllByYearAndUser(year, user);

        Map<Integer, Integer> petMap = new HashMap<>();
        for (int i = 0; i < petListTemp.size(); i++) {
            Pet pet = petListTemp.get(i);
            petMap.put(pet.getMonth(), i);
        }

        List<ResGetPet> petList = new ArrayList<>();
        for (int i = 0; i < MAX_MONTH ; i++){
            if (petMap.containsKey(i + 1)) {
                Pet pet = petListTemp.get(petMap.get(i + 1));
                petList.add(ResGetPet.builder()
                                .id(pet.getId())
                                .type(pet.getType())
                                .appearance(pet.getAppearance())
                                .face(pet.getFace())
                                .build());
            } else {
                petList.add(null);
            }
        }

        return ResGetPetList.builder()
                .petList(petList)
                .build();
    }

    @Transactional
    public ResGetPet getPet(Integer year, Integer month, Long id) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        Pet pet = petRepository.findByYearAndMonthAndUser(year, month, user)
                .orElseThrow(() -> new NullPointerException("Monthly Pet을 찾을 수 없습니다."));

        return createResGetPet(pet, year, month);
    }

    @Transactional
    public ResGetPet createResGetPet(Pet pet, Integer year, Integer month){
        ResGetPet.ResGetPetBuilder resGetPetBuilder = ResGetPet.builder();
        resGetPetBuilder
                .id(pet.getId())
                .type(pet.getType())
                .appearance(pet.getAppearance())
                .face(pet.getFace());

        Map<String, Long> emotionMap = new HashMap<>();
        for(String emotion: emotions){
            History history = historyRepository.findByEmotionAndYearAndMonth(
                    emotion, year, month
            );

            if (history == null){
                emotionMap.put(emotion, 0L);
            } else {
                emotionMap.put(emotion, history.getCount());
            }
        }
        resGetPetBuilder.emotionMap(emotionMap);

        return resGetPetBuilder.build();
    }
}
