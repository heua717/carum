package com.a101.carum.repository;

import com.a101.carum.api.dto.ReqGetFurnitureList;
import com.a101.carum.api.dto.ResGetFurniture;
import com.a101.carum.api.dto.ResGetFurnitureList;
import com.a101.carum.api.dto.ResGetFurnitureTemp;
import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.inventory.QInventory;
import com.a101.carum.domain.user.User;
import com.a101.carum.domain.user.UserDetail;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.a101.carum.domain.furniture.QFurniture.furniture;
import static com.a101.carum.domain.inventory.QInventory.inventory;
import static com.querydsl.core.types.ExpressionUtils.count;

@Repository
public class CustomFurnitureRepository extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public CustomFurnitureRepository(JPAQueryFactory queryFactory) {
        super(Furniture.class);
        this.queryFactory = queryFactory;
    }

    public ResGetFurnitureList readFurnitureList(ReqGetFurnitureList reqGetFurnitureList, Pageable pageable, User user, UserDetail userDetail) {

        BooleanBuilder booleanBuilder =  new BooleanBuilder();
        if(reqGetFurnitureList.getKeyword() != null) {
            booleanBuilder.and(furniture.name.contains(reqGetFurnitureList.getKeyword()));
        }
        if(reqGetFurnitureList.getType() != null) {
            booleanBuilder.and(furniture.type.eq(reqGetFurnitureList.getType()));
        }

        // TODO: 구매 여부 보낼 때 좀 더 효율성 높은 코드 작성
        JPQLQuery<ResGetFurnitureTemp> query = queryFactory
                .select(Projections.bean(
                        ResGetFurnitureTemp.class,
                        furniture,
                        ExpressionUtils.as(
                                JPAExpressions.select(count(inventory))
                                        .from(inventory)
                                        .where(inventory.furniture.eq(furniture).and(inventory.user.eq(user)))
                                ,"count"
                        )
                ))
                .from(furniture)
                .where(booleanBuilder);

        List<ResGetFurnitureTemp> furnitureListTemp = getQuerydsl().applyPagination(pageable, query).fetch();

        List<ResGetFurniture> furnitureList = new ArrayList<>();
        for(ResGetFurnitureTemp resGetFurnitureTemp:furnitureListTemp){
            Furniture f = resGetFurnitureTemp.getFurniture();
            boolean have = resGetFurnitureTemp.getCount() > 0? true:false;
            furnitureList.add(ResGetFurniture.builder()
                            .id(f.getId())
                            .name(f.getName())
                            .resource(f.getResource())
                            .price(f.getPrice())
                            .type(f.getType())
                            .have(have)
                            .build());
        }

        Long furnitureCount = query.fetchCount();

        return ResGetFurnitureList.builder()
                .furnitureList(furnitureList)
                .money(userDetail.getMoney())
                .furnitureCount(furnitureCount)
                .build();
    }
}
