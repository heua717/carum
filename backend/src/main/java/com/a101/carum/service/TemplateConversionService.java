package com.a101.carum.service;

import com.a101.carum.api.dto.ReqPostRoom;
import com.a101.carum.domain.room.RoomParent;
import com.a101.carum.domain.room.RoomTemplate;
import com.a101.carum.domain.user.User;
import com.a101.carum.repository.*;
import com.a101.carum.util.RoomParentFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TemplateConversionService {

    private final RoomParentFactory roomParentFactory;
    private final RoomParentRepository roomParentRepository;
    private final RoomRepository roomRepository;
    private final RoomTemplateRepository roomTemplateRepository;
    private final InteriorRepository interiorRepository;
    private final PlaylistRepository playlistRepository;

    @Value("${room.template.base}")
    private Long TEMPLATE_BASE;

    private List<Long> TEMPLATE_LIST;

    @Value("${room.template.list}")
    public void setTEMPLATE_LIST(String listString){
        String[] list = listString.split(",");
        TEMPLATE_LIST = new ArrayList<>();

        for(String id: list){
            TEMPLATE_LIST.add(Long.parseLong(id));
        }
    }

    @Transactional
    public void createBaseRoom(User user, ReqPostRoom reqPostRoom) {
        createRoomParent(user, reqPostRoom.getName(), TEMPLATE_BASE);
    }

    @Transactional
    public void createNewRoomAll(User user) {
        for(Long templateId: TEMPLATE_LIST){
            createRoomParent(user, null, templateId);
        }
    }

    @Transactional
    public void createRoomParent(User user, String name, Long templateId){
        RoomTemplate roomTemplate = roomTemplateRepository.findById(templateId)
                .orElseThrow(() -> {throw new NullPointerException("템플릿이 없습니다.");});
        RoomParent roomParent = roomParentFactory.createRoomParent(
                user,
                name != null? name:roomTemplate.getName(),
                roomTemplate.getBackground(),
                roomTemplate.getFrame(),
                roomTemplate.getEmotionTag()
        );
        roomParentRepository.save(roomParent);
    }

    @Transactional
    public void setRoomDetail(RoomParent roomParent, RoomTemplate roomTemplate){
        setInteriors(roomParent, roomTemplate);
        setPlaylists(roomParent, roomTemplate);
    }

    @Transactional
    public void setPlaylists(RoomParent roomParent, RoomTemplate roomTemplate) {
    }

    @Transactional
    public void setInteriors(RoomParent roomParent, RoomTemplate roomTemplate) {
    }
}
