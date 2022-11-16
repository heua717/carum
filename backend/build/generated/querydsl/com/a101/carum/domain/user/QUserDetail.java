package com.a101.carum.domain.user;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserDetail is a Querydsl query type for UserDetail
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUserDetail extends EntityPathBase<UserDetail> {

    private static final long serialVersionUID = -1552123545L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserDetail userDetail = new QUserDetail("userDetail");

    public final NumberPath<Integer> dailyColor = createNumber("dailyColor", Integer.class);

    public final EnumPath<com.a101.carum.domain.question.FaceType> dailyFace = createEnum("dailyFace", com.a101.carum.domain.question.FaceType.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DatePath<java.time.LocalDate> lastDiary = createDate("lastDiary", java.time.LocalDate.class);

    public final com.a101.carum.domain.room.QRoom mainRoom;

    public final NumberPath<Long> money = createNumber("money", Long.class);

    public final EnumPath<com.a101.carum.domain.pet.PetType> petType = createEnum("petType", com.a101.carum.domain.pet.PetType.class);

    public final QUser user;

    public QUserDetail(String variable) {
        this(UserDetail.class, forVariable(variable), INITS);
    }

    public QUserDetail(Path<? extends UserDetail> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserDetail(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserDetail(PathMetadata metadata, PathInits inits) {
        this(UserDetail.class, metadata, inits);
    }

    public QUserDetail(Class<? extends UserDetail> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.mainRoom = inits.isInitialized("mainRoom") ? new com.a101.carum.domain.room.QRoom(forProperty("mainRoom"), inits.get("mainRoom")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

