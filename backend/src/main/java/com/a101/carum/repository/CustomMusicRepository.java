package com.a101.carum.repository;

import com.a101.carum.api.dto.ResGetMusic;
import com.a101.carum.api.dto.ResGetMusicList;
import com.a101.carum.domain.music.Music;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.a101.carum.domain.music.QMusic.music;

@Repository
public class CustomMusicRepository extends QuerydslRepositorySupport {

    private final JPAQueryFactory queryFactory;

    public CustomMusicRepository(JPAQueryFactory queryFactory) {
        super(Music.class);
        this.queryFactory = queryFactory;
    }

    public ResGetMusicList readMusic(List<String> tags, Pageable pageable) {
        BooleanBuilder booleanBuilder =  new BooleanBuilder();

        if(tags != null){
            for(String tag:tags){
                booleanBuilder.and(music.emotionTag.contains(tag));
            }
        }

        JPQLQuery<Music> query = queryFactory
                .select(music)
                .from(music)
                .where(booleanBuilder);

        List<Music> musicListTemp = getQuerydsl().applyPagination(pageable, query).fetch();
        List<ResGetMusic> musicList = new ArrayList<>();
        for(Music musicTemp: musicListTemp) {
            musicList.add(ResGetMusic.builder()
                            .id(musicTemp.getId())
                            .resource(musicTemp.getResource())
                            .artist(musicTemp.getArtist())
                            .title(musicTemp.getTitle())
                            .build());
        }

        Long musicCount = query.fetchCount();

        return ResGetMusicList.builder()
                .musicList(musicList)
                .musicCount(musicCount)
                .build();
    }
}
