package com.a101.carum.repository;

import com.a101.carum.domain.interior.InteriorTemplate;
import com.a101.carum.domain.room.RoomTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InteriorTemplateRepository extends JpaRepository<InteriorTemplate, Long> {
    List<InteriorTemplate> findByRoomTemplate(RoomTemplate roomTemplate);

    void deleteByRoomTemplate(RoomTemplate roomTemplate);
}
