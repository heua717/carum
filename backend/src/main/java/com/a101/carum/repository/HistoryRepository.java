package com.a101.carum.repository;

import com.a101.carum.domain.history.History;
import com.a101.carum.domain.music.Music;
import com.a101.carum.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    History findByEmotion(String emotion);

    History findByEmotionAndYearAndMonth(String emotion, int year, int monthValue);

    History findTop1ByYearAndMonthOrderByCount(Integer year, Integer month);

    History findTop1ByYearAndMonthAndUserOrderByCount(Integer year, Integer month, User user);

    History findTop1ByYearAndMonthAndUserOrderByCountAsc(Integer year, Integer month, User user);

    History findTop1ByYearAndMonthAndUserOrderByCountDesc(Integer year, Integer month, User user);
}
