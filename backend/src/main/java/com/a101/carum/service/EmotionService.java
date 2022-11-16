package com.a101.carum.service;

import com.a101.carum.api.dto.ResGetEmotion;
import com.a101.carum.domain.user.User;
import com.a101.carum.repository.CustomDiaryRepository;
import com.a101.carum.repository.DiaryRepository;
import com.a101.carum.repository.UserRepository;
import com.a101.carum.util.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmotionService {
    private final CustomDiaryRepository diaryRepository;
    private final UserRepository userRepository;
    private final DateUtils dateUtils;

    @Transactional
    public ResGetEmotion readEmotion(Long id) {
        User user = userRepository.findByIdAndIsDeleted(id,false)
                .orElseThrow(()-> new NullPointerException("User를 찾을 수 없습니다"));
        LocalDateTime end = dateUtils.endDateTime(LocalDate.now());
        LocalDateTime start = dateUtils.endDateTime(LocalDate.now().minusDays(14));
        return diaryRepository.readEmotion(user, start, end);
    }
}
