package com.a101.carum.repository;

import com.a101.carum.api.dto.ResGetRoom;
import com.a101.carum.api.dto.ResGetRoomTemp;
import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.room.Room;
import com.a101.carum.domain.user.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.a101.carum.domain.room.QRoom.room;

@Repository
public class CustomRoomRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public CustomRoomRepository(JPAQueryFactory queryFactory) {
        super(Room.class);
        this.queryFactory = queryFactory;
    }

    public List<ResGetRoom> readRoomList(User user, List<String> tags) {
        BooleanBuilder booleanBuilder =  new BooleanBuilder();

        booleanBuilder.and(room.user.eq(user));

        if(tags != null){
            for(String tag:tags){
                booleanBuilder.and(room.emotionTag.contains(tag));
            }
        }

        List<ResGetRoomTemp> roomListTemp = queryFactory
                .select(Projections.bean(
                        ResGetRoomTemp.class,
                        room.id,
                        room.name,
                        room.emotionTag,
                        room.background,
                        room.frame
                ))
                .from(room)
                .where(booleanBuilder)
                .fetch();

        List<ResGetRoom> roomList = new ArrayList<>();

        for(ResGetRoomTemp resGetRoomTemp: roomListTemp){
            String emotionTagTemp = resGetRoomTemp.getEmotionTag();
            List<String> emotionTag = emotionTagTemp == null? new ArrayList<>(): List.of(emotionTagTemp.split(","));

            roomList.add(ResGetRoom.builder()
                            .id(resGetRoomTemp.getId())
                            .name(resGetRoomTemp.getName())
                            .background(resGetRoomTemp.getBackground())
                            .frame(resGetRoomTemp.getFrame())
                            .emotionTag(emotionTag)
                            .build());
        }
        return roomList;
    }
}
