package com.a101.carum.api.controller;

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

    private JwtService jwtService;

    private DiaryService diaryService;

    @PostMapping("")
    public ResponseEntity createDiary(@RequestBody ReqPostDiary reqPostDiary, HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);
        diaryService.postDiary(reqPostDiary, userId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("{diary_id}")
    public ResponseEntity updateDiary(@RequestBody ReqPostDiary reqPostDiary,@PathVariable Long diaryId, HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);
        diaryService.updateDiary(reqPostDiary, userId, diaryId);
        return ResponseEntity.ok().build();
    }
}
