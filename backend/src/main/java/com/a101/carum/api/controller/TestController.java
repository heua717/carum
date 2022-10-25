package com.a101.carum.api.controller;

import com.a101.carum.api.dto.ReqGetTestList;
import com.a101.carum.api.dto.ReqPatchTest;
import com.a101.carum.api.dto.ReqPostRedisTest;
import com.a101.carum.api.dto.ReqPostTest;
import com.a101.carum.service.TestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("test")
@Log4j2
public class TestController {
    private final TestService testService;

    @PostMapping()
    public ResponseEntity createTest(@RequestBody ReqPostTest reqPostTest) {
        testService.createTest(reqPostTest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{testId}")
    public ResponseEntity readTest(@PathVariable("testId") Long testId){
        return ResponseEntity.ok(testService.readTest(testId));
    }

    @PatchMapping("{testId}")
    public ResponseEntity updateTest(@PathVariable("testId") Long testId, @RequestBody ReqPatchTest reqPatchTest){
        return ResponseEntity.ok(testService.updateTest(testId, reqPatchTest));
    }

    @DeleteMapping("{testId}")
    public ResponseEntity deleteTest(@PathVariable("testId") Long testId){
        testService.deleteTest(testId);
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public ResponseEntity readTestList(@ModelAttribute ReqGetTestList reqGetTestList){
        return ResponseEntity.ok(testService.readTestList(reqGetTestList));
    }

    @PostMapping("redis")
    public ResponseEntity createRedisTest(@RequestBody ReqPostRedisTest reqPostRedisTest){
        testService.createRedisTest(reqPostRedisTest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("redis/{testId}")
    public ResponseEntity readRedisTest(@PathVariable("testId") Long testId){
        return ResponseEntity.ok(testService.readRedisTest(testId));
    }

    @PostMapping("redis/template/{testId}")
    public ResponseEntity createRedisTemplate(@PathVariable("testId") Long testId){
        testService.createRedisTemplate(testId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("redis/template/{testId}")
    public ResponseEntity readRedisTemplate(@PathVariable("testId") Long testId){
        return ResponseEntity.ok(testService.readRedisTemplate(testId));
    }
}
