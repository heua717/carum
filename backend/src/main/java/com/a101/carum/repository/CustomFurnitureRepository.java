package com.a101.carum.repository;

import com.a101.carum.api.dto.ReqGetFurnitureList;
import com.a101.carum.api.dto.ResGetFurniture;
import com.a101.carum.api.dto.ResGetFurnitureList;
import com.a101.carum.domain.furniture.Furniture;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.a101.carum.domain.furniture.QFurniture.furniture;

@Repository
public class CustomFurnitureRepository extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public CustomFurnitureRepository(JPAQueryFactory queryFactory) {
        super(Furniture.class);
        this.queryFactory = queryFactory;
    }

    public ResGetFurnitureList readFurnitureList(ReqGetFurnitureList reqGetFurnitureList, Pageable pageable) {

        BooleanBuilder booleanBuilder =  new BooleanBuilder();
        if(reqGetFurnitureList.getKeyword() != null) {
            booleanBuilder.and(furniture.name.contains(reqGetFurnitureList.getKeyword()));
        }
        if(reqGetFurnitureList.getType() != null) {
            booleanBuilder.and(furniture.type.eq(reqGetFurnitureList.getType()));
        }

        // TODO: 구매 여부까지 보내주기
        // TODO: Pageable 적용
        List<ResGetFurniture> furnitureList = queryFactory
                .select(Projections.bean(ResGetFurniture.class,
                        furniture.id,
                        furniture.name,
                        furniture.resource,
                        furniture.price,
                        furniture.type,
                        ))
                .from(furniture)
                .where(booleanBuilder)
                .fetch();

        return ResGetFurnitureList.builder()
                .furnitureList(furnitureList)
                .build();
    }
}
