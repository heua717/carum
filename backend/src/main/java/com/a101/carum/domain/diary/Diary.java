package com.a101.carum.domain.diary;

import com.a101.carum.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "diary")
@NoArgsConstructor
@Getter
@DynamicInsert
@DynamicUpdate
public class Diary {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "content")
    private String content;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "emotion_tag")
    private String emotionTag;

    @Column(name = "background")
    private String background;

    @Builder
    public Diary(User user, String content, LocalDateTime createDate, String emotionTag, String background) {
        this.user = user;
        this.content = content;
        this.createDate = createDate;
        this.emotionTag = emotionTag;
        this.background = background;
    }

    public void updateDiary(String content, String emotionTag, String background){
        this.content = content;
        this.emotionTag = emotionTag;
        this.background = background;
    }

    public void deleteDiary(String content) {
        this.content = content;
    }
}
