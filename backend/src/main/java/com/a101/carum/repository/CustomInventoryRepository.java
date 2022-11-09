package com.a101.carum.repository;

import com.a101.carum.api.dto.ReqGetInventory;
import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.inventory.Inventory;
import com.a101.carum.domain.user.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.a101.carum.domain.furniture.QFurniture.furniture;
import static com.a101.carum.domain.inventory.QInventory.inventory;

@Repository
public class CustomInventoryRepository extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public CustomInventoryRepository(JPAQueryFactory queryFactory) {
        super(Inventory.class);
        this.queryFactory = queryFactory;
    }

    public List<Inventory> readInventory(ReqGetInventory reqGetInventory, User user) {
        BooleanBuilder booleanBuilder =  new BooleanBuilder();

        System.out.println(reqGetInventory);

        booleanBuilder.and(inventory.user.eq(user));
        if(reqGetInventory.getKeyword() != null) {
            booleanBuilder.and(inventory.furniture.name.contains(reqGetInventory.getKeyword()));
        }
        if(reqGetInventory.getType() != null) {
            booleanBuilder.and(inventory.furniture.type.eq(reqGetInventory.getType()));
        }

        List<Inventory> inventoryList = queryFactory
                .select(inventory)
                .from(inventory)
                .where(booleanBuilder)
                .fetch();

        return inventoryList;
    }
}
