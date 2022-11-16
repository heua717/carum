package com.a101.carum.domain.playlist;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPlaylist is a Querydsl query type for Playlist
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlaylist extends EntityPathBase<Playlist> {

    private static final long serialVersionUID = 991300566L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPlaylist playlist = new QPlaylist("playlist");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.a101.carum.domain.music.QMusic music;

    public final com.a101.carum.domain.room.QRoom room;

    public QPlaylist(String variable) {
        this(Playlist.class, forVariable(variable), INITS);
    }

    public QPlaylist(Path<? extends Playlist> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPlaylist(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPlaylist(PathMetadata metadata, PathInits inits) {
        this(Playlist.class, metadata, inits);
    }

    public QPlaylist(Class<? extends Playlist> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.music = inits.isInitialized("music") ? new com.a101.carum.domain.music.QMusic(forProperty("music")) : null;
        this.room = inits.isInitialized("room") ? new com.a101.carum.domain.room.QRoom(forProperty("room"), inits.get("room")) : null;
    }

}

