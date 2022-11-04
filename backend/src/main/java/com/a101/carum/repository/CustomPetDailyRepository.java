package com.a101.carum.repository;


import com.a101.carum.domain.pet.PetDaily;
import com.a101.carum.domain.pet.PetType;
import com.a101.carum.domain.room.Room;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.a101.carum.domain.pet.QPetDaily.petDaily;

@Repository

public class CustomPetDailyRepository  extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public CustomPetDailyRepository(JPAQueryFactory queryFactory) {
        super(PetDaily.class);
        this.queryFactory = queryFactory;
    }

    public PetDaily getPetDaily(List<String> tags, PetType petType) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if(tags.size()>1) {
            for(String tag : tags){
                booleanBuilder.and(petDaily.emotionTag.contains(tag));
            }
        } else {
            booleanBuilder.and(petDaily.emotionTag.eq(tags.get(0)));
        }
        booleanBuilder.and(petDaily.petType.eq(petType));

        PetDaily petDaily1 = queryFactory
                .select(petDaily)
                .from(petDaily)
                .where(booleanBuilder)
                .fetchOne();

        return petDaily1;
    }

}
