package com.a101.carum.repository;

import com.a101.carum.api.dto.ReqGetTestList;
import com.a101.carum.api.dto.ResGetTest;
import com.a101.carum.domain.test.Test;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.a101.carum.domain.test.QTest.test;

@Repository
public class CustomTestRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public CustomTestRepository(JPAQueryFactory queryFactory) {
        super(Test.class);
        this.queryFactory = queryFactory;
    }

    public List<ResGetTest> searchTestByDynamicQuery(ReqGetTestList reqGetTestList){

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        if(reqGetTestList.getString() != null){
            booleanBuilder.and(test.string.contains(reqGetTestList.getString()));
        }
        if(reqGetTestList.getType() != null) {
            booleanBuilder.and(test.type.eq(reqGetTestList.getType()));
        }

        List<ResGetTest> testList = queryFactory
                .select(Projections.constructor(ResGetTest.class, test.id, test.string, test.date, test.type))
                .from(test)
                .where(booleanBuilder)
                .fetch();
        return testList;
    }
}
