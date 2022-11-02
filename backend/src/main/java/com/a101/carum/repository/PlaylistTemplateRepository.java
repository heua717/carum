package com.a101.carum.repository;

import com.a101.carum.domain.music.Music;
import com.a101.carum.domain.playlist.Playlist;
import com.a101.carum.domain.room.Room;
import com.a101.carum.domain.template.PlaylistTemplate;
import com.a101.carum.domain.template.RoomTemplate;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistTemplateRepository extends JpaRepository<PlaylistTemplate, Long> {

    void deleteByRoomTemplate(RoomTemplate roomTemplate);

    List<PlaylistTemplate> findByRoomTemplate(RoomTemplate roomTemplate, Sort id);
}
