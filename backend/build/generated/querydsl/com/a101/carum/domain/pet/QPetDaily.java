package com.a101.carum.domain.pet;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPetDaily is a Querydsl query type for PetDaily
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPetDaily extends EntityPathBase<PetDaily> {

    private static final long serialVersionUID = 1680939521L;

    public static final QPetDaily petDaily = new QPetDaily("petDaily");

    public final StringPath color = createString("color");

    public final StringPath emotionTag = createString("emotionTag");

    public final EnumPath<com.a101.carum.domain.question.FaceType> face = createEnum("face", com.a101.carum.domain.question.FaceType.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<PetType> petType = createEnum("petType", PetType.class);

    public QPetDaily(String variable) {
        super(PetDaily.class, forVariable(variable));
    }

    public QPetDaily(Path<? extends PetDaily> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPetDaily(PathMetadata metadata) {
        super(PetDaily.class, metadata);
    }

}

