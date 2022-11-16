package com.a101.carum.domain.interior;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInteriorTemplate is a Querydsl query type for InteriorTemplate
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInteriorTemplate extends EntityPathBase<InteriorTemplate> {

    private static final long serialVersionUID = 541638704L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QInteriorTemplate interiorTemplate = new QInteriorTemplate("interiorTemplate");

    public final com.a101.carum.domain.furniture.QFurniture furniture;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.a101.carum.domain.room.QRoomTemplate roomTemplate;

    public final NumberPath<Float> rotX = createNumber("rotX", Float.class);

    public final NumberPath<Float> rotY = createNumber("rotY", Float.class);

    public final NumberPath<Float> rotZ = createNumber("rotZ", Float.class);

    public final NumberPath<Float> x = createNumber("x", Float.class);

    public final NumberPath<Float> y = createNumber("y", Float.class);

    public final NumberPath<Float> z = createNumber("z", Float.class);

    public QInteriorTemplate(String variable) {
        this(InteriorTemplate.class, forVariable(variable), INITS);
    }

    public QInteriorTemplate(Path<? extends InteriorTemplate> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QInteriorTemplate(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QInteriorTemplate(PathMetadata metadata, PathInits inits) {
        this(InteriorTemplate.class, metadata, inits);
    }

    public QInteriorTemplate(Class<? extends InteriorTemplate> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.furniture = inits.isInitialized("furniture") ? new com.a101.carum.domain.furniture.QFurniture(forProperty("furniture")) : null;
        this.roomTemplate = inits.isInitialized("roomTemplate") ? new com.a101.carum.domain.room.QRoomTemplate(forProperty("roomTemplate")) : null;
    }

}

