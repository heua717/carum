package com.a101.carum.repository;

import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
}
