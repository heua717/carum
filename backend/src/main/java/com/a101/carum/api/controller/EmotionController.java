package com.a101.carum.api.controller;

import com.a101.carum.service.EmotionService;
import com.a101.carum.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("emotion")
public class EmotionController {

    private final JwtService jwtService;
    private final EmotionService emotionService;

    @GetMapping()
    public ResponseEntity readEmotion(HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        return ResponseEntity.ok(emotionService.readEmotion(id));
    }
}
