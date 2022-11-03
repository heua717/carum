package com.a101.carum.domain.playlist;

import com.a101.carum.domain.music.Music;
import com.a101.carum.domain.room.RoomTemplate;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Getter
@ToString
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "template_id", "music_id" }) })
public class PlaylistTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @ManyToOne(targetEntity = RoomTemplate.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id", referencedColumnName = "id")
    private RoomTemplate roomTemplate;

    @ManyToOne(targetEntity = Music.class)
    @JoinColumn(name = "music_id", referencedColumnName = "id")
    private Music music;

    @Builder
    public PlaylistTemplate(RoomTemplate roomTemplate, Music music) {
        this.roomTemplate = roomTemplate;
        this.music = music;
    }
}
