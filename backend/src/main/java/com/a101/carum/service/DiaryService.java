package com.a101.carum.service;

import com.a101.carum.api.dto.ReqGetDiaryList;
import com.a101.carum.api.dto.ReqPostDiary;
import com.a101.carum.api.dto.ResGetDiary;
import com.a101.carum.api.dto.ResGetDiaryList;
import com.a101.carum.common.exception.UnAuthorizedException;
import com.a101.carum.domain.diary.Diary;
import com.a101.carum.domain.user.User;
import com.a101.carum.repository.DiaryRepository;
import com.a101.carum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;

    @Transactional
    public void postDiary(ReqPostDiary reqPostDiary, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new NullPointerException("User를 찾을 수 없습니다"));
        Diary diary = diaryRepository.findByCreateDateBetween(LocalDateTime.of(LocalDate.now(), LocalTime.of(0,0,0)),LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59)));
        if(diary!=null){
            throw new UnAuthorizedException("이미 Diary를 작성하였습니다.");
        }
        StringBuilder sb = new StringBuilder();
        if(reqPostDiary.getEmotionTag().size()!=0){
            for (String a: reqPostDiary.getEmotionTag()) {
                System.out.println(a);
                sb.append(a).append(",");
            }
        }
        diary = Diary.builder()
                .content(reqPostDiary.getContent())
                .user(user)
                .background(reqPostDiary.getBackground())
                .emotionTag(sb.toString())
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
        } else if(diary.getCreateDate().getDayOfMonth() != LocalDateTime.now().getDayOfMonth()){
            throw new UnAuthorizedException("일기는 당일 수정만 가능합니다.");
        }
        StringBuilder sb = new StringBuilder();
        if(reqPostDiary.getEmotionTag().size()!=0){
            for (String a: reqPostDiary.getEmotionTag()) {
                System.out.println(a);
                sb.append(a).append(",");
            }
        }
        diary.updateDiary(reqPostDiary.getContent(), sb.toString() , reqPostDiary.getBackground());
        diaryRepository.save(diary);


    }

    @Transactional
    public ResGetDiary getDiary(Long diaryId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new NullPointerException("User를 찾을 수 없습니다."));
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new NullPointerException("Diary를 찾을 수 없습니다."));
        if(!user.equals(diary.getUser())) {
            throw new UnAuthorizedException("User가 작성한 Diary가 아닙니다.");
        }
        List<String> emotionTag = new ArrayList<>();
        String[] emotionList = diary.getEmotionTag().split(",");
        for (String emotion: emotionList) {
            emotionTag.add(emotion);
        }
        return ResGetDiary.builder()
                .content(diary.getContent())
                .createDate(diary.getCreateDate())
                .background(diary.getBackground())
                .emotionTag(emotionTag)
                .build();
    }


    @Transactional
    public ResGetDiaryList getDiaryList(ReqGetDiaryList reqGetDiaryList, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));

        List<Diary> diaryList = diaryRepository.findAllByUser(user);
        ResGetDiaryList resGetDiaryList = new ResGetDiaryList();
        for (Diary diarys : diaryList) {
            if(diarys.getCreateDate().getYear()==reqGetDiaryList.getYear() && diarys.getCreateDate().getMonthValue() == reqGetDiaryList.getMonth()){
                List<String> emotionList = new ArrayList<>();
                for(String emotion : diarys.getEmotionTag().split(",")) {
                    emotionList.add(emotion);
                }
                resGetDiaryList.getDiaryList().add(ResGetDiary.builder()
                                .id(diarys.getId())
                                .createDate(diarys.getCreateDate())
                                .content(diarys.getContent())
                                .emotionTag(emotionList)
                                .background(diarys.getBackground())
                                .build());
            }

        }
        return resGetDiaryList;
    }

    @Transactional
    public void deleteDiary(Long diaryId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(() -> new NullPointerException("Diary를 찾을 수 없습니다."));
        if(!diary.getUser().equals(user)) {
            throw new UnAuthorizedException("User가 작성한 Diary가 아닙니다.");
        }
        diary.deleteDiary("");
        diaryRepository.save(diary);


    }
}
