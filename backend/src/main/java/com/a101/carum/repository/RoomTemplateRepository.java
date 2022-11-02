package com.a101.carum.repository;

import com.a101.carum.domain.room.RoomTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomTemplateRepository extends JpaRepository<RoomTemplate, Long> {
}
