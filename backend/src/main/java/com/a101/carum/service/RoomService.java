package com.a101.carum.service;

import com.a101.carum.api.dto.*;
import com.a101.carum.common.exception.LessMoneyException;
import com.a101.carum.common.exception.UnAuthorizedException;
import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.interior.Interior;
import com.a101.carum.domain.music.Music;
import com.a101.carum.domain.playlist.Playlist;
import com.a101.carum.domain.room.Room;
import com.a101.carum.domain.room.RoomParent;
import com.a101.carum.domain.room.RoomType;
import com.a101.carum.domain.user.User;
import com.a101.carum.domain.user.UserDetail;
import com.a101.carum.domain.user.UserType;
import com.a101.carum.repository.*;
import com.a101.carum.util.RoomParentFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;
    private final RoomRepository roomRepository;

    private final RoomTemplateRepository roomTemplateRepository;
    private final RoomParentRepository roomParentRepository;
    private final CustomRoomRepository customRoomRepository;
    private final InteriorRepository interiorRepository;
    private final FurnitureRepository furnitureRepository;
    private final InventoryRepository inventoryRepository;
    private final PlaylistRepository playlistRepository;
    private final MusicRepository musicRepository;
    private final TemplateConversionService templateConversionService;
    private final RoomParentFactory roomParentFactory;

    private final Long ROOM_PRICE = 50L;

    @Transactional
    public void createRoom(ReqPostRoom reqPostRoom, Long id, RoomType roomType) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        UserDetail userDetail = userDetailRepository.findByUser(user)
                .orElseThrow(() -> new NullPointerException("User 정보가 손상되었습니다."));

        if(roomType == RoomType.ROOM){
            if(userDetail.getMoney() < ROOM_PRICE) {
                throw new LessMoneyException("방을 살 돈이 없습니다.");
            }
            userDetail.updateMoney(ROOM_PRICE, '-');
        } else if(user.getUserType() != UserType.ADMIN){
            throw new UnAuthorizedException("권한이 없습니다.");
        }

        templateConversionService.createBaseRoom(user, reqPostRoom, roomType);
    }

    @Transactional
    public void updateRoom(ReqPatchRoom reqPatchRoom, Long id, Long roomId, RoomType roomType) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        RoomParent room = roomParentFactory.readRoomParent(roomId, user, roomType);

        if(reqPatchRoom.getName() != null) {
            room.updateName(reqPatchRoom.getName());
        }

        if(reqPatchRoom.getEmotionTags() != null) {
            StringBuilder sb = new StringBuilder();
            Collections.sort(reqPatchRoom.getEmotionTags());
            for(String tag: reqPatchRoom.getEmotionTags()){
                sb.append(tag).append(",");
            }
            room.updateEmotionTag(sb.toString());
        }

    }

    @Transactional
    public ResGetRoomList readRoomList(ReqGetRoomList reqGetRoomList, Long id, RoomType roomType) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        UserDetail userDetail = userDetailRepository.findByUser(user)
                .orElseThrow(() -> new NullPointerException("User 정보가 손상되었습니다."));

        ResGetRoomList.ResGetRoomListBuilder resGetRoomListBuilder = ResGetRoomList.builder();
        if(roomType == RoomType.ROOM){
            resGetRoomListBuilder.mainRoomId(
                    userDetail.getMainRoom().getId()
            );
        }

        List<ResGetRoom> roomList = customRoomRepository.readRoomList(user, reqGetRoomList.getTags(), roomType);
        resGetRoomListBuilder.roomList(roomList);
        return resGetRoomListBuilder.build();
    }

    @Transactional
    public void updateInterior(ReqPutRoom reqPutRoom, Long id, Long roomId, RoomType roomType) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        RoomParent room = roomParentFactory.readRoomParent(roomId, user, roomType);

        if(reqPutRoom.getBackground() != null){
            room.updateBackground(reqPutRoom.getBackground());
        }
        if(reqPutRoom.getFrame() != null) {
            room.updateFrame(reqPutRoom.getFrame());
        }
        if(reqPutRoom.getInteriorList() != null) {
            for(ReqPutRoomDetail reqPutRoomDetail: reqPutRoom.getInteriorList()){
                switch (reqPutRoomDetail.getAction()){
                    case ADD:
                        Furniture furniture = furnitureRepository.findById(reqPutRoomDetail.getFurnitureId())
                                .orElseThrow(() -> new NullPointerException("Furniture를 찾을 수 없습니다."));
                        inventoryRepository.findByUserAndFurniture(user, furniture)
                                .orElseThrow(() -> new UnAuthorizedException("가구를 구매한적 없습니다"));
                        interiorRepository.save(Interior.builder()
                                .room(room)
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
                        Interior interiorDelete = interiorRepository.findById(reqPutRoomDetail.getInteriorId())
                                .orElseThrow(() -> new NullPointerException("Interior를 등록한 적 없습니다."));
                        if (interiorDelete.getRoom().getId() != room.getId()){
                            throw new UnAuthorizedException("권한이 없습니다");
                        }
                        interiorRepository.delete(interiorDelete);
                        break;
                    case MOD:
                        Interior interiorUpdate = interiorRepository.findById(reqPutRoomDetail.getInteriorId())
                                .orElseThrow(() -> new NullPointerException("Interior를 등록한 적 없습니다."));
                        if (interiorUpdate.getRoom().getId() != room.getId()){
                            throw new UnAuthorizedException("권한이 없습니다");
                        }
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
    public ResGetInteriorList readInterior(Long id, Long roomId, RoomType roomType) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        RoomParent room = roomParentFactory.readRoomParent(roomId, user, roomType);
        List<Interior> interiors = interiorRepository.findByRoom(room);

        List<ResGetInterior> interiorList = new ArrayList<>();

        for(Interior interior: interiors){
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
                .background(room.getBackground())
                .frame(room.getFrame())
                .interiorList(interiorList)
                .build();
    }

    @Transactional
    public void deleteInterior(Long id, Long roomId, RoomType roomType) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        RoomParent room = roomParentFactory.readRoomParent(roomId, user, roomType);

        interiorRepository.deleteByRoom(room);
        playlistRepository.deleteByRoom(room);

        interiorRepository.flush();
        playlistRepository.flush();

        templateConversionService.initializeRoom(room, user);
    }

    @Transactional
    public void updatePlaylist(ReqPutPlaylist reqPutPlaylist, Long id, Long roomId, RoomType roomType) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        RoomParent room = roomParentFactory.readRoomParent(roomId, user, roomType);
        playlistRepository.deleteByRoom(room);
        playlistRepository.flush();

        List<Long> musicList = reqPutPlaylist.getPlaylist();

        for(Long musicId: musicList) {
            Music music = musicRepository.findById(musicId)
                    .orElseThrow(() -> new NullPointerException("Music을 찾을 수 없습니다."));

            playlistRepository.save(Playlist.builder()
                            .room(room)
                            .music(music)
                            .build());
        }
    }

    @Transactional
    public ResGetPlaylist readPlaylist(Long id, Long roomId, RoomType roomType) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        RoomParent room = roomParentFactory.readRoomParent(roomId, user, roomType);

        List<Playlist> playlistList = playlistRepository.findByRoom(room, Sort.by(Sort.Direction.ASC, "id"));
        List<ResGetMusic> musicList = new ArrayList<>();

        for(Playlist playlist: playlistList){
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
    public void updateMainRoom(ReqPutMainRoom reqPutMainRoom, Long id) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        UserDetail userDetail = userDetailRepository.findByUser(user)
                .orElseThrow(() -> new NullPointerException("User 정보가 손상되었습니다."));
        Room room = roomRepository.findByIdAndUser(reqPutMainRoom.getRoomId(), user)
                .orElseThrow(() -> new NullPointerException("Room을 찾을 수 없습니다."));
        userDetail.updateMainRoom(room);
    }
}
