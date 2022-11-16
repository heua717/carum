package com.a101.carum.service;

import com.a101.carum.api.dto.ReqGetMusicList;
import com.a101.carum.api.dto.ResGetMusicList;
import com.a101.carum.domain.music.Music;
import com.a101.carum.repository.CustomMusicRepository;
import com.a101.carum.repository.MusicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MusicService {

    private final CustomMusicRepository customMusicRepository;
    private final MusicRepository musicRepository;
    public ResGetMusicList readMusicList(ReqGetMusicList reqGetMusicList, Pageable pageable) {
        return customMusicRepository.readMusic(reqGetMusicList.getTags(), pageable);
    }

    public String readResource(Long musicId) {
        Music music = musicRepository.findById(musicId)
                .orElseThrow(() -> new NullPointerException("Music 찾을 수 없습니다."));;
        return music.getResource();
    }
}
