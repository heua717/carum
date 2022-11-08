package com.a101.carum.domain.room;

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
public class RoomTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "background")
    private Integer background;

    @Column(name = "frame")
    private Integer frame;

    @Column(name = "emotion_tag", length = 500)
    private String emotionTag;

    @Builder
    public RoomTemplate(String name, Integer background, Integer frame, String emotionTag){
        this.name = name;
        this.background = background;
        this.frame = frame;
        this.emotionTag = emotionTag;
    }

    public void updateName(String name){
        this.name = name;
    }

    public void updateBackground(Integer background){
        this.background = background;
    }

    public void updateEmotionTag(String emotionTag){
        this.emotionTag = emotionTag;
    }

    public void updateFrame(Integer frame) {
        this.frame = frame;
    }
}
