package com.a101.carum.repository;

import com.a101.carum.api.dto.ReqGetFurnitureList;
import com.a101.carum.api.dto.ResGetFurnitureList;
import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.inventory.QInventory;
import com.a101.carum.domain.user.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.a101.carum.domain.furniture.QFurniture.furniture;
import static com.a101.carum.domain.inventory.QInventory.inventory;
import static com.querydsl.jpa.JPAExpressions.select;

@Repository
public class CustomFurnitureRepository extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public CustomFurnitureRepository(JPAQueryFactory queryFactory) {
        super(Furniture.class);
        this.queryFactory = queryFactory;
    }

    public ResGetFurnitureList readFurnitureList(ReqGetFurnitureList reqGetFurnitureList, Pageable pageable, User user) {

        BooleanBuilder booleanBuilder =  new BooleanBuilder();
        if(reqGetFurnitureList.getKeyword() != null) {
            booleanBuilder.and(furniture.name.contains(reqGetFurnitureList.getKeyword()));
        }
        if(reqGetFurnitureList.getType() != null) {
            booleanBuilder.and(furniture.type.eq(reqGetFurnitureList.getType()));
        }

        // TODO: 구매 여부까지 보내주기
        // TODO: Pageable 적용

        /*
        List<Tuple> list = queryFactory
                .select(inventory.furniture.id, inventory.user.id)
                .from(inventory)
                .where(inventory.user.eq(user))
                .fetch();


        List<Tuple> list = queryFactory
                .select(
                        furniture, inventory
                )
                .from(furniture)
                .leftJoin(

                )
                .on(furniture.eq(furniture))
                .where(booleanBuilder)
                .fetch();
*/
        return null;
    }
}
