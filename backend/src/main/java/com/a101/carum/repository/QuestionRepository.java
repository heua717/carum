package com.a101.carum.repository;

import com.a101.carum.domain.question.Question;
import com.a101.carum.domain.test.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query(value = "select * from question order by RAND() limit 1", nativeQuery = true)
    Question findByRandom();
}
