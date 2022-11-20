package com.a101.carum.service;

import com.a101.carum.api.dto.ReqGetDiaryList;
import com.a101.carum.api.dto.ReqPostDiary;
import com.a101.carum.api.dto.ResGetDiary;
import com.a101.carum.api.dto.ResGetDiaryList;
import com.a101.carum.common.exception.UnAuthorizedException;
import com.a101.carum.domain.diary.Diary;
import com.a101.carum.domain.history.History;
import com.a101.carum.domain.pet.PetDaily;
import com.a101.carum.domain.user.User;
import com.a101.carum.domain.user.UserDetail;
import com.a101.carum.repository.*;
import com.a101.carum.util.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;
    private final CustomPetDailyRepository petDailyRepository;
    private final HistoryRepository historyRepository;
    private final DateUtils dateUtils;

    @Transactional
    public void postDiary(ReqPostDiary reqPostDiary, Long userId) {
        User user = userRepository.findByIdAndIsDeleted(userId,false)
                .orElseThrow(()-> new NullPointerException("User를 찾을 수 없습니다"));
        Diary diary = diaryRepository.findByCreateDateBetweenAndUser(
                dateUtils.startDateTime(LocalDate.now()),
                dateUtils.endDateTime(LocalDate.now()),user)
                .orElse(null);
        UserDetail userDetail = userDetailRepository.findByUser(user)
                .orElseThrow(()-> new NullPointerException("User정보가 손상 되었습니다."));
        userDetail.updateMoney(100L, '+');
        if(diary!=null){
            throw new UnAuthorizedException("이미 Diary를 작성하였습니다.");
        }
        StringBuilder sb = new StringBuilder();
        if(reqPostDiary.getEmotionTag().size()!=0){
            int cnt = 0;
            for (String a: reqPostDiary.getEmotionTag()) {
                if(cnt>0){
                    sb.append(",");
                }
                sb.append(a);
                cnt++;
            }
        }

        PetDaily petDaily = petDailyRepository.getPetDaily(reqPostDiary.getEmotionTag(), userDetail.getPetType());
        userDetail.updateDaily(petDaily.getFace(), petDaily.Color(petDaily.getColor()), LocalDate.now());

        for(String emotion: reqPostDiary.getEmotionTag()) {
            LocalDate today = LocalDate.now();
            History history = historyRepository.findByEmotionAndUserAndMonthAndYear(
                            emotion, user, today.getMonthValue(), today.getYear()
                    )
                    .orElseThrow(()-> new NullPointerException("emotion이 잘못되었습니다."));
            history.plusCount();
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
        User user = userRepository.findByIdAndIsDeleted(userId, false)
                .orElseThrow(()-> new NullPointerException("User를 칮을 수 없습니다"));
        UserDetail userDetail = userDetailRepository.findByUser(user)
                .orElseThrow(() -> new NullPointerException("유저 정보가 손상되었습니다."));
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(()-> new NullPointerException("Diary를 찾을 수 없습니다"));

        if(!diary.getUser().equals(user)) {
            throw new UnAuthorizedException("User가 작성한 Diary가 아닙니다.");
        } else if(diary.getCreateDate().getDayOfMonth() != LocalDateTime.now().getDayOfMonth()){
            throw new UnAuthorizedException("일기는 당일 수정만 가능합니다.");
        }

        PetDaily petDaily = petDailyRepository.getPetDaily(reqPostDiary.getEmotionTag(), userDetail.getPetType());
        userDetail.updateDaily(petDaily.getFace(), petDaily.Color(petDaily.getColor()), userDetail.getLastDiary());

        String[] emotionTag = diary.getEmotionTag().split(",");
        for(String emotion: emotionTag){
            History history = historyRepository.findByEmotionAndUser(emotion, user)
                    .orElseThrow(()-> new NullPointerException("emotion이 잘못되었습니다."));
            history.minusCount();
        }

        StringBuilder sb = new StringBuilder();
        if(reqPostDiary.getEmotionTag().size()!=0){
            for (String emotion: reqPostDiary.getEmotionTag()) {
                sb.append(emotion).append(",");
                History history = historyRepository.findByEmotionAndUser(emotion, user)
                        .orElseThrow(()-> new NullPointerException("emotion이 잘못되었습니다."));
                history.plusCount();
            }
        }

        diary.updateDiary(reqPostDiary.getContent(), sb.toString() , reqPostDiary.getBackground());
        diaryRepository.save(diary);


    }

    @Transactional
    public ResGetDiary getDiary(Long diaryId, Long userId) {
        User user = userRepository.findByIdAndIsDeleted(userId, false)
                .orElseThrow(()-> new NullPointerException("User를 찾을 수 없습니다."));
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new NullPointerException("Diary를 찾을 수 없습니다."));
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
        User user = userRepository.findByIdAndIsDeleted(userId, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        List<Diary> diaryList;
        // request Day 값이 0이면 월간조회
        if(reqGetDiaryList.getDay()==0){
            Calendar cal = Calendar.getInstance();
            cal.set(reqGetDiaryList.getYear(), reqGetDiaryList.getMonth(),reqGetDiaryList.getDay());
            reqGetDiaryList.setDay(cal.getActualMaximum(Calendar.DAY_OF_MONTH));
            diaryList = diaryRepository.findAllByCreateDateBetweenAndUserOrderByCreateDateAsc(
                    dateUtils.startDateTime(dateUtils.startDate(reqGetDiaryList))
                    ,dateUtils.endDateTime(dateUtils.getDate(reqGetDiaryList)),user);
        } else { // Day의 값이 0보다 크면 day로부터 7일간 조회
            diaryList = diaryRepository.findAllByCreateDateBetweenAndUserOrderByCreateDateAsc(
                    dateUtils.startDateTime(dateUtils.getDate(reqGetDiaryList))
                    ,dateUtils.endDateTime(dateUtils.getDate(reqGetDiaryList)).plusDays(6),user);
        }

        ResGetDiaryList resGetDiaryList = new ResGetDiaryList();
        for(Diary diarys : diaryList) {
            List<String> emotionList = new ArrayList<>();
            for(String emotion : diarys.getEmotionTag().split(",")){
                emotionList.add(emotion);
            }
            resGetDiaryList.getDiaryList().add(
                   ResGetDiary.builder()
                           .id(diarys.getId())
                           .content(diarys.getContent())
                           .createDate(diarys.getCreateDate())
                           .background(diarys.getBackground())
                           .emotionTag(emotionList)
                           .build()
            );
        }

        return resGetDiaryList;
    }

    @Transactional
    public void deleteDiary(Long diaryId, Long userId) {
        User user = userRepository.findByIdAndIsDeleted(userId, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new NullPointerException("Diary를 찾을 수 없습니다."));
        if(!diary.getUser().equals(user)) {
            throw new UnAuthorizedException("User가 작성한 Diary가 아닙니다.");
        }
        diary.deleteDiary("");
        diaryRepository.save(diary);
    }
}
