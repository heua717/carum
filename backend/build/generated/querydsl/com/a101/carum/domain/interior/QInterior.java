package com.a101.carum.domain.interior;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInterior is a Querydsl query type for Interior
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInterior extends EntityPathBase<Interior> {

    private static final long serialVersionUID = -596671082L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QInterior interior = new QInterior("interior");

    public final com.a101.carum.domain.furniture.QFurniture furniture;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.a101.carum.domain.room.QRoom room;

    public final NumberPath<Float> rotX = createNumber("rotX", Float.class);

    public final NumberPath<Float> rotY = createNumber("rotY", Float.class);

    public final NumberPath<Float> rotZ = createNumber("rotZ", Float.class);

    public final NumberPath<Float> x = createNumber("x", Float.class);

    public final NumberPath<Float> y = createNumber("y", Float.class);

    public final NumberPath<Float> z = createNumber("z", Float.class);

    public QInterior(String variable) {
        this(Interior.class, forVariable(variable), INITS);
    }

    public QInterior(Path<? extends Interior> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QInterior(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QInterior(PathMetadata metadata, PathInits inits) {
        this(Interior.class, metadata, inits);
    }

    public QInterior(Class<? extends Interior> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.furniture = inits.isInitialized("furniture") ? new com.a101.carum.domain.furniture.QFurniture(forProperty("furniture")) : null;
        this.room = inits.isInitialized("room") ? new com.a101.carum.domain.room.QRoom(forProperty("room"), inits.get("room")) : null;
    }

}

