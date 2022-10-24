package com.a101.carum.service;

import com.a101.carum.api.dto.*;
import com.a101.carum.domain.redistest.RedisTest;
import com.a101.carum.domain.test.Test;
import com.a101.carum.repository.CustomTestRepository;
import com.a101.carum.repository.RedisTestRepository;
import com.a101.carum.repository.TestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestRepository testRepository;
    private final CustomTestRepository customTestRepository;
    private final RedisTestRepository redisTestRepository;
    private final RedisTemplate<Long, String> redisTemplate;

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

    public List<ResGetTest> readTestList(ReqGetTestList reqGetTestList) {
        return customTestRepository.searchTestByDynamicQuery(reqGetTestList);
    }

    public void createRedisTest(ReqPostRedisTest reqPostRedisTest) {
        RedisTest redisTest = RedisTest.builder()
                .id(reqPostRedisTest.getId())
                .date(reqPostRedisTest.getDate())
                .string(reqPostRedisTest.getString())
                .type(reqPostRedisTest.getType())
                .build();

        redisTestRepository.save(redisTest);
    }

    public RedisTest readRedisTest(Long testId) {
        return redisTestRepository.findById(testId)
                .orElseThrow(() -> new NullPointerException("Test를 찾을 수 없습니다."));
    }

    public void createRedisTemplate(Long testId) {
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new NullPointerException("Test를 찾을 수 없습니다."));
        ValueOperations<Long, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(test.getId(), test.getString());
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime end = now.toLocalDate().plusDays(1).atStartOfDay();
        Long expireTime = ChronoUnit.SECONDS.between(now, end);
        System.out.println(expireTime);
        redisTemplate.expire(test.getId(), expireTime, TimeUnit.SECONDS);
    }

    public String readRedisTemplate(Long testId){
        ValueOperations<Long, String> valueOperations = redisTemplate.opsForValue();
        String string = valueOperations.get(testId);

        return string;
    }
}
