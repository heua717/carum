package com.a101.carum.repository;

import com.a101.carum.api.dto.ResGetEmotion;
import com.a101.carum.api.dto.ResGetRoom;
import com.a101.carum.api.dto.ResGetRoomTemp;
import com.a101.carum.domain.diary.Diary;
import com.a101.carum.domain.question.FaceType;
import com.a101.carum.domain.room.RoomType;
import com.a101.carum.domain.user.User;
import com.a101.carum.util.DateUtils;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.a101.carum.domain.diary.QDiary.diary;

@Repository
public class CustomDiaryRepository extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public CustomDiaryRepository(JPAQueryFactory queryFactory) {
        super(Diary.class);
        this.queryFactory = queryFactory;
    }

    public ResGetEmotion readEmotion(User user, LocalDateTime start, LocalDateTime end) {

        ResGetEmotion.ResGetEmotionBuilder resGetEmotionBuilder = ResGetEmotion.builder();

        Long diaryAll = getBasicQuery(user, start, end).fetchCount();
        resGetEmotionBuilder.diaryAll(diaryAll);
        resGetEmotionBuilder.result(FaceType.NORMAL);

        if(diaryAll >= 10){
            Long worry = getBasicQuery(user, start, end)
                    .where(diary.emotionTag.contains("WORRY"))
                    .fetchCount();
            Long sad = getBasicQuery(user, start, end)
                    .where(diary.emotionTag.contains("SAD"))
                    .fetchCount();

            if (worry*100/diaryAll >= 50){
                resGetEmotionBuilder.diaryCount(worry).result(FaceType.WORRY);
            } else if (sad*100/diaryAll >= 50){
                resGetEmotionBuilder.diaryCount(sad).result(FaceType.SAD);
            }
        }

        return resGetEmotionBuilder.build();
    }

    public JPQLQuery<Diary> getBasicQuery(User user, LocalDateTime start, LocalDateTime end){
        return queryFactory
                .select(diary)
                .from(diary)
                .where(diary.user.eq(user)
                        .and(diary.createDate.between(start, end)));
    }
}
