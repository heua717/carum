package com.a101.carum.service;

import com.a101.carum.api.dto.ReqPatchTest;
import com.a101.carum.api.dto.ReqPostTest;
import com.a101.carum.api.dto.ResGetTest;
import com.a101.carum.domain.test.Test;
import com.a101.carum.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestRepository testRepository;

    public void createTest(ReqPostTest reqPostTest) {
        Test.TestBuilder testBuilder = Test.builder();
        testBuilder.string(reqPostTest.getString());
        Test test = testBuilder
                .date(reqPostTest.getDate())
                .type(reqPostTest.getType())
                .build();
        testRepository.save(test);
    }

    public ResGetTest readTest(Long testId) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new NullPointerException("Test를 찾을 수 없습니다."));
        return ResGetTest.builder()
                .id(test.getId())
                .date(test.getDate())
                .string(test.getString())
                .type(test.getType())
                .build();
    }

    @Transactional
    public ResGetTest updateTest(Long testId, ReqPatchTest reqPatchTest) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new NullPointerException("Test를 찾을 수 없습니다."));
        if(reqPatchTest.getString() != null) {
            test.updateString(reqPatchTest.getString());
        }
        if(reqPatchTest.getType() != null) {
            test.updateType(reqPatchTest.getType());
        }

        return ResGetTest.builder()
                .id(test.getId())
                .date(test.getDate())
                .string(test.getString())
                .type(test.getType())
                .build();
    }

    @Transactional
    public void deleteTest(Long testId) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new NullPointerException("Test를 찾을 수 없습니다."));
        testRepository.delete(test);
    }
}
