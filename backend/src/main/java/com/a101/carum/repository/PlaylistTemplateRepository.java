package com.a101.carum.repository;

import com.a101.carum.domain.playlist.PlaylistTemplate;
import com.a101.carum.domain.room.RoomTemplate;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaylistTemplateRepository extends JpaRepository<PlaylistTemplate, Long> {

    void deleteByRoomTemplate(RoomTemplate roomTemplate);

    List<PlaylistTemplate> findByRoomTemplate(RoomTemplate roomTemplate, Sort id);
}
