package com.a101.carum.service;

import com.a101.carum.api.dto.ResGetQuestion;
import com.a101.carum.domain.question.Question;
import com.a101.carum.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    public ResGetQuestion readQuestion() {
        Question question = questionRepository.findByRandom();
        return ResGetQuestion.builder()
                .content(question.getContent())
                .face(question.getFace())
                .build();
    }
}
