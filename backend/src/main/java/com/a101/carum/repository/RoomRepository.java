package com.a101.carum.repository;

import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.room.Room;
import com.a101.carum.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByIdAndUser(Long roomId, User user);
}
