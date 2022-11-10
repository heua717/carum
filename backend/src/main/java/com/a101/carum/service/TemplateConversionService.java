package com.a101.carum.service;

import com.a101.carum.api.dto.ReqPostRoom;
import com.a101.carum.domain.room.RoomParent;
import com.a101.carum.domain.room.RoomTemplate;
import com.a101.carum.domain.user.User;
import com.a101.carum.repository.RoomParentRepository;
import com.a101.carum.repository.RoomRepository;
import com.a101.carum.repository.RoomTemplateRepository;
import com.a101.carum.util.RoomParentFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TemplateConversionService {

    private final RoomParentFactory roomParentFactory;
    private final RoomParentRepository roomParentRepository;
    private final RoomRepository roomRepository;
    private final RoomTemplateRepository roomTemplateRepository;

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


    public void createBaseRoom(User user, ReqPostRoom reqPostRoom) {
        createRoomParent(user, reqPostRoom.getName(), TEMPLATE_BASE);
    }

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

    }
}
