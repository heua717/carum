package com.a101.carum.repository;

import com.a101.carum.domain.diary.Diary;
import com.a101.carum.domain.user.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findAllByUser(User user);
    Diary findByCreateDateBetween(LocalDateTime start, LocalDateTime end);
}
