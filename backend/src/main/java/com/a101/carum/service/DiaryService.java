package com.a101.carum.service;

import com.a101.carum.api.dto.ReqPostDiary;
import com.a101.carum.common.exception.UnAuthorizedException;
import com.a101.carum.domain.diary.Diary;
import com.a101.carum.domain.user.User;
import com.a101.carum.repository.DiaryRepository;
import com.a101.carum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;

    @Transactional
    public void postDiary(ReqPostDiary reqPostDiary, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new NullPointerException("User를 찾을 수 없습니다"));
        Diary diary = Diary.builder()
                .content(reqPostDiary.getContent())
                .user(user)
                .background(reqPostDiary.getBackground())
                .emotionTag(reqPostDiary.getEmotionTag())
                .createDate(LocalDateTime.now())
                .build();
        diaryRepository.save(diary);
    }

    @Transactional
    public void updateDiary(ReqPostDiary reqPostDiary, Long userId, Long diaryId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new NullPointerException("User를 칮을 수 없습니다"));
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(()-> new NullPointerException("Diary를 찾을 수 없습니다"));
        if(!diary.getUser().equals(user)) {
            throw new UnAuthorizedException("User가 작성한 Diary가 아닙니다.");
        } else{
            diary.updateDiary(reqPostDiary.getContent(), reqPostDiary.getEmotionTag(), reqPostDiary.getBackground());
            diaryRepository.save(diary);
        }

    }
}
