package com.a101.carum.domain.inventory;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInventory is a Querydsl query type for Inventory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInventory extends EntityPathBase<Inventory> {

    private static final long serialVersionUID = -661898638L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QInventory inventory = new QInventory("inventory");

    public final com.a101.carum.domain.furniture.QFurniture furniture;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.a101.carum.domain.user.QUser user;

    public QInventory(String variable) {
        this(Inventory.class, forVariable(variable), INITS);
    }

    public QInventory(Path<? extends Inventory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QInventory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QInventory(PathMetadata metadata, PathInits inits) {
        this(Inventory.class, metadata, inits);
    }

    public QInventory(Class<? extends Inventory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.furniture = inits.isInitialized("furniture") ? new com.a101.carum.domain.furniture.QFurniture(forProperty("furniture")) : null;
        this.user = inits.isInitialized("user") ? new com.a101.carum.domain.user.QUser(forProperty("user")) : null;
    }

}

