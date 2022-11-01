package com.a101.carum.repository;

import com.a101.carum.domain.playlist.Playlist;
import com.a101.carum.domain.question.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

}
