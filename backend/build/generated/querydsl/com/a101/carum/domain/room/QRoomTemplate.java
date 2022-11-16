package com.a101.carum.domain.room;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QRoomTemplate is a Querydsl query type for RoomTemplate
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoomTemplate extends EntityPathBase<RoomTemplate> {

    private static final long serialVersionUID = 85060112L;

    public static final QRoomTemplate roomTemplate = new QRoomTemplate("roomTemplate");

    public final NumberPath<Integer> background = createNumber("background", Integer.class);

    public final StringPath emotionTag = createString("emotionTag");

    public final NumberPath<Integer> frame = createNumber("frame", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath name = createString("name");

    public QRoomTemplate(String variable) {
        super(RoomTemplate.class, forVariable(variable));
    }

    public QRoomTemplate(Path<? extends RoomTemplate> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRoomTemplate(PathMetadata metadata) {
        super(RoomTemplate.class, metadata);
    }

}

