package com.a101.carum.api.controller;

import com.a101.carum.api.dto.ReqGetMusicList;
import com.a101.carum.service.MusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("music")
public class MusicController {

    private final MusicService musicService;

    @GetMapping()
    public ResponseEntity readMusicList(@ModelAttribute ReqGetMusicList reqGetMusicList, Pageable pageable) {
        return ResponseEntity.ok(musicService.readMusicList(reqGetMusicList, pageable));
    }
}
