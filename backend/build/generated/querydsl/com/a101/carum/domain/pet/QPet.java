package com.a101.carum.domain.pet;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPet is a Querydsl query type for Pet
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPet extends EntityPathBase<Pet> {

    private static final long serialVersionUID = 950103800L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPet pet = new QPet("pet");

    public final NumberPath<Integer> appearance = createNumber("appearance", Integer.class);

    public final EnumPath<com.a101.carum.domain.question.FaceType> face = createEnum("face", com.a101.carum.domain.question.FaceType.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> month = createNumber("month", Integer.class);

    public final EnumPath<PetType> type = createEnum("type", PetType.class);

    public final com.a101.carum.domain.user.QUser user;

    public final NumberPath<Integer> year = createNumber("year", Integer.class);

    public QPet(String variable) {
        this(Pet.class, forVariable(variable), INITS);
    }

    public QPet(Path<? extends Pet> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPet(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPet(PathMetadata metadata, PathInits inits) {
        this(Pet.class, metadata, inits);
    }

    public QPet(Class<? extends Pet> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.a101.carum.domain.user.QUser(forProperty("user")) : null;
    }

}

