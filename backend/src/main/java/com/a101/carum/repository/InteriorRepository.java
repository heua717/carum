package com.a101.carum.repository;

import com.a101.carum.domain.interior.Interior;
import com.a101.carum.domain.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InteriorRepository extends JpaRepository<Interior, Long> {
}
