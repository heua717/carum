package com.a101.carum.domain.room;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Getter
@ToString
@NoArgsConstructor
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn // 하위 테이블의 구분 컬럼 생성(default = DTYPE)
public class RoomParent {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    public RoomParent(String name, Integer background, Integer frame, String emotionTag){
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
