package com.a101.carum.domain.test;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTest is a Querydsl query type for Test
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTest extends EntityPathBase<Test> {

    private static final long serialVersionUID = 666454486L;

    public static final QTest test = new QTest("test");

    public final DatePath<java.time.LocalDate> date = createDate("date", java.time.LocalDate.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath string = createString("string");

    public final EnumPath<TestType> type = createEnum("type", TestType.class);

    public QTest(String variable) {
        super(Test.class, forVariable(variable));
    }

    public QTest(Path<? extends Test> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTest(PathMetadata metadata) {
        super(Test.class, metadata);
    }

}

