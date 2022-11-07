package com.a101.carum.repository;

import com.a101.carum.domain.history.History;
import com.a101.carum.domain.music.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    History findByEmotion(String emotion);

    History findByEmotionAndYearAndMonth(String emotion, int year, int monthValue);
}
