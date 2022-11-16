package com.a101.carum.domain.furniture;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QFurniture is a Querydsl query type for Furniture
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFurniture extends EntityPathBase<Furniture> {

    private static final long serialVersionUID = 80081950L;

    public static final QFurniture furniture = new QFurniture("furniture");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final StringPath name = createString("name");

    public final NumberPath<Long> price = createNumber("price", Long.class);

    public final StringPath resource = createString("resource");

    public final EnumPath<FurnitureType> type = createEnum("type", FurnitureType.class);

    public QFurniture(String variable) {
        super(Furniture.class, forVariable(variable));
    }

    public QFurniture(Path<? extends Furniture> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFurniture(PathMetadata metadata) {
        super(Furniture.class, metadata);
    }

}

