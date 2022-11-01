package com.a101.carum.api.controller;

import com.a101.carum.api.dto.ReqGetDiaryList;
import com.a101.carum.api.dto.ReqPostDiary;
import com.a101.carum.service.DiaryService;
import com.a101.carum.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpServerErrorException;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("diary")
public class DiaryController {

    private final JwtService jwtService;

    private final DiaryService diaryService;

    @PostMapping("")
    public ResponseEntity createDiary(@RequestBody ReqPostDiary reqPostDiary, HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);
        diaryService.postDiary(reqPostDiary, userId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("{diaryId}")
    public ResponseEntity updateDiary(@RequestBody ReqPostDiary reqPostDiary,@PathVariable Long diaryId, HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);
        diaryService.updateDiary(reqPostDiary, userId, diaryId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{diaryId}")
    public ResponseEntity getDiary(@PathVariable Long diaryId, HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);

        return ResponseEntity.ok(diaryService.getDiary(diaryId, userId));
    }
    @GetMapping("")
    public ResponseEntity getDiaryList(@RequestBody ReqGetDiaryList reqGetDiaryList, HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);

        return ResponseEntity.ok(diaryService.getDiaryList(reqGetDiaryList, userId));
    }



    @DeleteMapping("{diaryId}")
    public ResponseEntity deleteDiary(@PathVariable Long diaryId, HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);
        diaryService.deleteDiary(diaryId, userId);
        return ResponseEntity.ok().build();
    }

}
