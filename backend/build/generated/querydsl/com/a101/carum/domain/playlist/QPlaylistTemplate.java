package com.a101.carum.domain.playlist;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPlaylistTemplate is a Querydsl query type for PlaylistTemplate
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlaylistTemplate extends EntityPathBase<PlaylistTemplate> {

    private static final long serialVersionUID = 1545930352L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPlaylistTemplate playlistTemplate = new QPlaylistTemplate("playlistTemplate");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.a101.carum.domain.music.QMusic music;

    public final com.a101.carum.domain.room.QRoomTemplate roomTemplate;

    public QPlaylistTemplate(String variable) {
        this(PlaylistTemplate.class, forVariable(variable), INITS);
    }

    public QPlaylistTemplate(Path<? extends PlaylistTemplate> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPlaylistTemplate(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPlaylistTemplate(PathMetadata metadata, PathInits inits) {
        this(PlaylistTemplate.class, metadata, inits);
    }

    public QPlaylistTemplate(Class<? extends PlaylistTemplate> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.music = inits.isInitialized("music") ? new com.a101.carum.domain.music.QMusic(forProperty("music")) : null;
        this.roomTemplate = inits.isInitialized("roomTemplate") ? new com.a101.carum.domain.room.QRoomTemplate(forProperty("roomTemplate")) : null;
    }

}

