package com.a101.carum.repository;

import com.a101.carum.domain.music.Music;
import com.a101.carum.domain.playlist.Playlist;
import com.a101.carum.domain.question.Question;
import com.a101.carum.domain.room.Room;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    Playlist findByRoomAndMusic(Room room, Music music);

    void deleteByRoom(Room room);

    List<Playlist> findByRoom(Room room, Sort sort);
}
