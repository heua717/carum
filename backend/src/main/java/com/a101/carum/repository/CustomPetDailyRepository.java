package com.a101.carum.repository;


import com.a101.carum.domain.pet.PetDaily;
import com.a101.carum.domain.pet.PetType;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
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

    // 일기 가지고 펫의 기분을 처리함
    public PetDaily getPetDaily(List<String> tags, PetType petType) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if(tags != null && tags.size() > 0) {
            for(String tag : tags){
                System.out.println(tag);
                booleanBuilder.and(petDaily.emotionTag.contains(tag));
            }
        }
        System.out.println(petType);
        booleanBuilder.and(petDaily.petType.eq(petType));

        List<PetDaily> petDailyList = queryFactory.select(petDaily).from(petDaily).fetch();
        System.out.println(petDailyList);

        PetDaily petDailyRet = queryFactory
                .select(petDaily)
                .from(petDaily)
                .where(booleanBuilder)
                .fetchOne();

        return petDailyRet;
    }

}
