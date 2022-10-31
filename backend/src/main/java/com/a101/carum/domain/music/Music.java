package com.a101.carum.domain.music;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Getter
public class Music {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @Column(name = "artist", nullable = false, length = 30)
    private String artist;

    @Column(name = "title", nullable = false, length = 30)
    private String title;

    @Column(name = "resource", nullable = false, length = 100)
    private String resource;

    @Column(name = "emotion_tag", length = 500)
    private String emotionTag;
}
