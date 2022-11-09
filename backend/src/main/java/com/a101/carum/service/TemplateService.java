package com.a101.carum.service;

import com.a101.carum.api.dto.*;
import com.a101.carum.common.exception.UnAuthorizedException;
import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.music.Music;
import com.a101.carum.domain.interior.InteriorTemplate;
import com.a101.carum.domain.playlist.PlaylistTemplate;
import com.a101.carum.domain.room.RoomTemplate;
import com.a101.carum.domain.user.User;
import com.a101.carum.domain.user.UserType;
import com.a101.carum.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TemplateService {

    private final UserRepository userRepository;
    private final MusicRepository musicRepository;
    private final PlaylistTemplateRepository playlistTemplateRepository;
    private final FurnitureRepository furnitureRepository;
    private final RoomTemplateRepository roomTemplateRepository;
    private final InteriorTemplateRepository interiorTemplateRepository;

    private final TemplateConversionService templateConversionService;

    private final String BACKGROUND = "WHITE,BLACK";

    @Transactional
    public void createTemplate(ReqPostRoom reqPostRoom, Long id) {
        checkUser(id);

        templateConversionService.createNewTemplate(reqPostRoom);
    }

    @Transactional
    public void updateTemplate(ReqPatchRoom reqPatchRoom, Long id, Long templateId) {
        checkUser(id);

        RoomTemplate roomTemplate = roomTemplateRepository.findById(templateId)
                .orElseThrow(() -> new NullPointerException("template을 찾을 수 없습니다."));

        if(reqPatchRoom.getName() != null) {
            roomTemplate.updateName(reqPatchRoom.getName());
        }

        if(reqPatchRoom.getEmotionTags() != null) {
            StringBuilder sb = new StringBuilder();
            Collections.sort(reqPatchRoom.getEmotionTags());
            for (String tag : reqPatchRoom.getEmotionTags()) {
                sb.append(tag).append(",");
            }
            roomTemplate.updateEmotionTag(sb.toString());
        }
    }

    @Transactional
    public ResGetRoomList readTemplateList(Long id) {
        checkUser(id);
        List<RoomTemplate> roomTemplateList = roomTemplateRepository.findAll();
        List<ResGetRoom> roomList = new ArrayList<>();

        for(RoomTemplate roomTemplate: roomTemplateList){
            String emotionTagTemp = roomTemplate.getEmotionTag();
            List<String> emotionTag = emotionTagTemp == null? new ArrayList<>():List.of(emotionTagTemp.split(","));
            roomList.add(ResGetRoom.builder()
                    .id(roomTemplate.getId())
                    .name(roomTemplate.getName())
                    .background(roomTemplate.getBackground())
                    .frame(roomTemplate.getFrame())
                    .emotionTag(emotionTag)
                    .build());
        }

        return ResGetRoomList.builder()
                .roomList(roomList)
                .build();
    }

    @Transactional
    public void updateInterior(ReqPutRoom reqPutRoom, Long id, Long templateId) {
        checkUser(id);
        RoomTemplate roomTemplate = roomTemplateRepository.findById(templateId)
                .orElseThrow(() -> new NullPointerException("template을 찾을 수 없습니다."));

        roomTemplate.updateBackground(reqPutRoom.getBackground());
        roomTemplate.updateFrame(reqPutRoom.getFrame());

        if(reqPutRoom.getInteriorList() != null) {
            for (ReqPutRoomDetail reqPutRoomDetail : reqPutRoom.getInteriorList()) {
                switch (reqPutRoomDetail.getAction()) {
                    case ADD:
                        Furniture furniture = furnitureRepository.findById(reqPutRoomDetail.getFurnitureId())
                                .orElseThrow(() -> new NullPointerException("Furniture를 찾을 수 없습니다."));
                        interiorTemplateRepository.save(InteriorTemplate.builder()
                                .roomTemplate(roomTemplate)
                                .furniture(furniture)
                                .x(reqPutRoomDetail.getX())
                                .y(reqPutRoomDetail.getY())
                                .z(reqPutRoomDetail.getZ())
                                .rotX(reqPutRoomDetail.getRotX())
                                .rotY(reqPutRoomDetail.getRotY())
                                .rotZ(reqPutRoomDetail.getRotZ())
                                .build()
                        );
                        break;
                    case DEL:
                        InteriorTemplate interiorDelete = interiorTemplateRepository.findById(reqPutRoomDetail.getInteriorId())
                                .orElseThrow(() -> new NullPointerException("Interior를 등록한 적 없습니다."));
                        ;
                        interiorTemplateRepository.delete(interiorDelete);
                        break;
                    case MOD:
                        InteriorTemplate interiorUpdate = interiorTemplateRepository.findById(reqPutRoomDetail.getInteriorId())
                                .orElseThrow(() -> new NullPointerException("Interior를 등록한 적 없습니다."));
                        ;
                        interiorUpdate.updatePlace(
                                reqPutRoomDetail.getX(),
                                reqPutRoomDetail.getY(),
                                reqPutRoomDetail.getZ(),
                                reqPutRoomDetail.getRotX(),
                                reqPutRoomDetail.getRotY(),
                                reqPutRoomDetail.getRotZ()
                        );
                        break;
                }
            }
        }
    }

    @Transactional
    public ResGetInteriorList readInterior(Long id, Long templateId) {
        checkUser(id);
        RoomTemplate roomTemplate = roomTemplateRepository.findById(templateId)
                .orElseThrow(() -> new NullPointerException("template을 찾을 수 없습니다."));
        List<InteriorTemplate> interiorTemplates = interiorTemplateRepository.findByRoomTemplate(roomTemplate);
        List<ResGetInterior> interiorList = new ArrayList<>();

        for(InteriorTemplate interior: interiorTemplates){
            interiorList.add(ResGetInterior.builder()
                    .interiorId(interior.getId())
                    .furnitureId(interior.getFurniture().getId())
                    .resource(interior.getFurniture().getResource())
                    .x(interior.getX())
                    .rotX(interior.getRotX())
                    .y(interior.getY())
                    .rotY(interior.getRotY())
                    .z(interior.getZ())
                    .rotZ(interior.getRotZ())
                    .build());
        }
        return ResGetInteriorList.builder()
                .background(roomTemplate.getBackground())
                .frame(roomTemplate.getFrame())
                .interiorList(interiorList)
                .build();
    }

    @Transactional
    public void deleteInterior(Long id, Long templateId) {
        checkUser(id);
        RoomTemplate roomTemplate = roomTemplateRepository.findById(templateId)
                .orElseThrow(() -> new NullPointerException("template을 찾을 수 없습니다."));

        interiorTemplateRepository.deleteByRoomTemplate(roomTemplate);
        playlistTemplateRepository.deleteByRoomTemplate(roomTemplate);

        interiorTemplateRepository.flush();
        playlistTemplateRepository.flush();

        templateConversionService.initializeTemplate(roomTemplate);
    }

    @Transactional
    public void updatePlaylist(ReqPutPlaylist reqPutPlaylist, Long id, Long templateId) {
        checkUser(id);
        RoomTemplate roomTemplate = roomTemplateRepository.findById(templateId)
                .orElseThrow(() -> new NullPointerException("template을 찾을 수 없습니다."));
        playlistTemplateRepository.deleteByRoomTemplate(roomTemplate);
        playlistTemplateRepository.flush();

        List<Long> musicList = reqPutPlaylist.getPlaylist();

        for(Long musicId: musicList) {
            Music music = musicRepository.findById(musicId)
                    .orElseThrow(() -> new NullPointerException("Music을 찾을 수 없습니다."));

            playlistTemplateRepository.save(PlaylistTemplate.builder()
                    .roomTemplate(roomTemplate)
                    .music(music)
                    .build());
        }
    }

    @Transactional
    public ResGetPlaylist readPlaylist(Long id, Long templateId) {
        checkUser(id);
        RoomTemplate roomTemplate = roomTemplateRepository.findById(templateId)
                .orElseThrow(() -> new NullPointerException("template을 찾을 수 없습니다."));
        List<PlaylistTemplate> playlistList = playlistTemplateRepository.findByRoomTemplate(roomTemplate, Sort.by(Sort.Direction.ASC, "id"));
        List<ResGetMusic> musicList = new ArrayList<>();

        for(PlaylistTemplate playlist: playlistList){
            Music music = playlist.getMusic();
            musicList.add(ResGetMusic.builder()
                    .title(music.getTitle())
                    .artist(music.getArtist())
                    .resource(music.getResource())
                    .id(music.getId())
                    .build());
        }

        return ResGetPlaylist.builder()
                .playlist(musicList)
                .build();
    }

    @Transactional
    public void checkUser(Long id){
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));

        if(user.getUserType() != UserType.ADMIN){
            throw new UnAuthorizedException("권한이 없습니다.");
        }
    }
}
