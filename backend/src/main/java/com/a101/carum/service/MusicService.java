package com.a101.carum.service;

import com.a101.carum.api.dto.ReqGetMusicList;
import com.a101.carum.api.dto.ResGetMusicList;
import com.a101.carum.repository.CustomMusicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MusicService {

    private final CustomMusicRepository customMusicRepository;
    public ResGetMusicList readMusicList(ReqGetMusicList reqGetMusicList, Pageable pageable) {
        return customMusicRepository.readMusic(reqGetMusicList.getTags(), pageable);
    }
}
