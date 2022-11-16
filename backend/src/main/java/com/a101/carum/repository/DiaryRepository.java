package com.a101.carum.repository;

import com.a101.carum.domain.diary.Diary;
import com.a101.carum.domain.user.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findAllByUser(User user);
    Optional<Diary> findByCreateDateBetweenAndUser(LocalDateTime start, LocalDateTime end, User user);

    List<Diary> findAllByCreateDateBetweenAndUserOrderByCreateDateAsc(LocalDateTime start, LocalDateTime end, User user);
}
