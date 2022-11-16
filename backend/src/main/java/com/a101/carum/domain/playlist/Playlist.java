package com.a101.carum.domain.playlist;

import com.a101.carum.domain.music.Music;
import com.a101.carum.domain.room.Room;
import com.a101.carum.domain.room.RoomParent;
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
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "room_id", "music_id" }) })
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @ManyToOne(targetEntity = RoomParent.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private RoomParent room;

    @ManyToOne(targetEntity = Music.class)
    @JoinColumn(name = "music_id", referencedColumnName = "id")
    private Music music;

    @Builder
    public Playlist(RoomParent room, Music music) {
        this.room = room;
        this.music = music;
    }

}
