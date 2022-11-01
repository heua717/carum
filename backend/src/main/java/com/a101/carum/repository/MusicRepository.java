package com.a101.carum.repository;

import com.a101.carum.domain.interior.Interior;
import com.a101.carum.domain.music.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MusicRepository extends JpaRepository<Music, Long> {
}
