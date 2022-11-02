package com.a101.carum.service;

import com.a101.carum.domain.template.InteriorTemplate;
import com.a101.carum.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TemplateService {

    private final MusicRepository musicRepository;
    private final PlaylistRepository playlistRepository;
    private final FurnitureRepository furnitureRepository;
    private final RoomTemplateRepository roomTemplateRepository;
    private final InteriorTemplateRepository interiorTemplateRepository;

}
