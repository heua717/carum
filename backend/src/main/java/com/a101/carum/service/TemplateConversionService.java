package com.a101.carum.service;

import com.a101.carum.api.dto.ReqPostRoom;
import com.a101.carum.domain.ServiceType;
import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.interior.Interior;
import com.a101.carum.domain.interior.InteriorTemplate;
import com.a101.carum.domain.inventory.Inventory;
import com.a101.carum.domain.playlist.Playlist;
import com.a101.carum.domain.playlist.PlaylistTemplate;
import com.a101.carum.domain.room.Room;
import com.a101.carum.domain.room.RoomTemplate;
import com.a101.carum.domain.user.User;
import com.a101.carum.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TemplateConversionService {

    @Value("${room.template.base}")
    private Long TEMPLATE_BASE;

    private List<Long> TEMPLATE_LIST;

    @Value("${room.template.list}")
    public void setTEMPLATE_LIST(String listString){
        String[] list = listString.split(",");
        this.TEMPLATE_LIST = new ArrayList<>();

        for(String id: list){
            this.TEMPLATE_LIST.add(Long.parseLong(id));
        }
    }

    private final RoomRepository roomRepository;
    private final RoomTemplateRepository roomTemplateRepository;
    private final InteriorRepository interiorRepository;
    private final InteriorTemplateRepository interiorTemplateRepository;
    private final PlaylistRepository playlistRepository;
    private final PlaylistTemplateRepository playlistTemplateRepository;

    private final InventoryRepository inventoryRepository;

    @Transactional
    public void createNewRoomAll(User user){
        for(Long templateId:TEMPLATE_LIST){
            templateToRoom(user, templateId, null);
        }
    }

    @Transactional
    public void createNewRoom(User user, ReqPostRoom reqPostRoom){
        templateToRoom(user, TEMPLATE_BASE, reqPostRoom);
    }

    @Transactional
    public void createNewTemplate(ReqPostRoom reqPostRoom){
        templateToTemplate(TEMPLATE_BASE, reqPostRoom);
    }

    @Transactional
    public void initializeRoom(Room room){
        initializeRoom(room, TEMPLATE_BASE);
    }

    @Transactional
    public void initializeTemplate(RoomTemplate roomTemplate){
        initializeTemplate(roomTemplate, TEMPLATE_BASE);
    }

    @Transactional
    public void templateToRoom(User user, Long templateId, ReqPostRoom reqPostRoom){
        RoomTemplate roomTemplate = roomTemplateRepository.findById(templateId)
                .orElseThrow(() -> new NullPointerException("template을 찾을 수 없습니다."));

        Room room = roomRepository.save(Room.builder()
                        .user(user)
                        .name(reqPostRoom != null? reqPostRoom.getName():roomTemplate.getName())
                        .frame(roomTemplate.getFrame())
                        .background(roomTemplate.getBackground())
                        .emotionTag(roomTemplate.getEmotionTag())
                        .build());

        templateToRoomDetail(room, roomTemplate, user);
    }

    @Transactional
    public void templateToTemplate(Long templateId, ReqPostRoom reqPostRoom){
        RoomTemplate roomTemplate = roomTemplateRepository.findById(templateId)
                .orElseThrow(() -> new NullPointerException("template을 찾을 수 없습니다."));

        RoomTemplate room = roomTemplateRepository.save(RoomTemplate.builder()
                .name(reqPostRoom != null? reqPostRoom.getName():roomTemplate.getName())
                .frame(roomTemplate.getFrame())
                .background(roomTemplate.getBackground())
                .emotionTag(roomTemplate.getEmotionTag())
                .build());

        templateToTemplateDetail(room, roomTemplate);
    }

    @Transactional
    public void initializeRoom(Room room, Long templateId){
        RoomTemplate roomTemplate = roomTemplateRepository.findById(templateId)
                .orElseThrow(() -> new NullPointerException("template을 찾을 수 없습니다."));

        room.updateFrame(roomTemplate.getFrame());
        room.updateBackground(roomTemplate.getBackground());
        room.updateEmotionTag(room.getEmotionTag());

        templateToRoomDetail(room, roomTemplate, null);
    }

    @Transactional
    public void initializeTemplate(RoomTemplate room, Long templateId){
        RoomTemplate roomTemplate = roomTemplateRepository.findById(templateId)
                .orElseThrow(() -> new NullPointerException("template을 찾을 수 없습니다."));

        room.updateFrame(roomTemplate.getFrame());
        room.updateBackground(roomTemplate.getBackground());
        room.updateEmotionTag(room.getEmotionTag());

        templateToTemplateDetail(room, roomTemplate);
    }

    @Transactional
    public void templateToRoomDetail(Room room, RoomTemplate roomTemplate, User user){
        List<InteriorTemplate> interiorTemplateList = interiorTemplateRepository.findByRoomTemplate(roomTemplate);
        List<PlaylistTemplate> playlistTemplateList = playlistTemplateRepository.findByRoomTemplate(roomTemplate,Sort.by(Sort.Direction.ASC, "id"));

        for(InteriorTemplate template: interiorTemplateList){
            interiorRepository.save(Interior.builder()
                    .room(room)
                    .furniture(template.getFurniture())
                    .x(template.getX())
                    .y(template.getY())
                    .z(template.getZ())
                    .rotX(template.getRotX())
                    .rotY(template.getRotY())
                    .rotZ(template.getRotZ())
                    .build());

            Inventory inventory = inventoryRepository.findByUserAndFurniture(user, template.getFurniture()).orElse(null);
            if (inventory == null) {
                inventoryRepository.save(
                        Inventory.builder()
                                .user(user)
                                .furniture(template.getFurniture())
                                .build()
                );
            }
        }

        for(PlaylistTemplate template: playlistTemplateList){
            playlistRepository.save(Playlist.builder()
                    .room(room)
                    .music(template.getMusic())
                    .build());
        }
    }

    @Transactional
    public void templateToTemplateDetail(RoomTemplate room, RoomTemplate roomTemplate){
        List<InteriorTemplate> interiorTemplateList = interiorTemplateRepository.findByRoomTemplate(roomTemplate);
        List<PlaylistTemplate> playlistTemplateList = playlistTemplateRepository.findByRoomTemplate(roomTemplate,Sort.by(Sort.Direction.ASC, "id"));

        for(InteriorTemplate template: interiorTemplateList){
            interiorTemplateRepository.save(InteriorTemplate.builder()
                    .roomTemplate(room)
                    .furniture(template.getFurniture())
                    .x(template.getX())
                    .y(template.getY())
                    .z(template.getZ())
                    .rotX(template.getRotX())
                    .rotY(template.getRotY())
                    .rotZ(template.getRotZ())
                    .build());
        }

        for(PlaylistTemplate template: playlistTemplateList){
            playlistTemplateRepository.save(PlaylistTemplate.builder()
                    .roomTemplate(room)
                    .music(template.getMusic())
                    .build());
        }
    }
}
