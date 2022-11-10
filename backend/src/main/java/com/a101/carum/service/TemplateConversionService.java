package com.a101.carum.service;

import com.a101.carum.api.dto.ReqPostRoom;
import com.a101.carum.domain.interior.Interior;
import com.a101.carum.domain.playlist.Playlist;
import com.a101.carum.domain.room.Room;
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
    public void initializeRoom(RoomParent room) {
        RoomTemplate roomTemplate = roomTemplateRepository.findById(TEMPLATE_BASE)
                .orElseThrow(() -> {throw new NullPointerException("템플릿이 없습니다.");});
        room.updateBackground(roomTemplate.getBackground());
        room.updateEmotionTag(roomTemplate.getEmotionTag());
        room.updateFrame(roomTemplate.getFrame());

        interiorRepository.deleteByRoom(room);
        interiorRepository.flush();
        setInteriors(room, roomTemplate);

        playlistRepository.deleteByRoom(room);
        playlistRepository.flush();
        setPlaylists(room, roomTemplate);
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
        roomParent = roomParentRepository.save(roomParent);
        setRoomDetail(roomParent, roomTemplate);
    }

    @Transactional
    public void setRoomDetail(RoomParent roomParent, RoomTemplate roomTemplate){
        setInteriors(roomParent, roomTemplate);
        setPlaylists(roomParent, roomTemplate);
    }

    @Transactional
    public void setPlaylists(RoomParent roomParent, RoomTemplate roomTemplate) {
        List<Playlist> playlistList = playlistRepository.findByRoom(roomTemplate);
        for(Playlist playList: playlistList){
            playlistRepository.save(Playlist.builder()
                            .room(roomParent)
                            .music(playList.getMusic())
                            .build());
        }
    }

    @Transactional
    public void setInteriors(RoomParent roomParent, RoomTemplate roomTemplate) {
        List<Interior> interiorList = interiorRepository.findByRoom(roomTemplate);
        for(Interior interior: interiorList){
            interiorRepository.save(Interior.builder()
                            .room(roomParent)
                            .furniture(interior.getFurniture())
                            .x(interior.getX())
                            .y(interior.getY())
                            .z(interior.getZ())
                            .rotX(interior.getRotX())
                            .rotY(interior.getRotY())
                            .rotZ(interior.getRotZ())
                            .build());
        }
    }
}
