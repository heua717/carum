package com.a101.carum.service;

import com.a101.carum.api.dto.*;
import com.a101.carum.domain.room.Room;
import com.a101.carum.domain.user.User;
import com.a101.carum.domain.user.UserDetail;
import com.a101.carum.repository.CustomRoomRepository;
import com.a101.carum.repository.RoomRepository;
import com.a101.carum.repository.UserDetailRepository;
import com.a101.carum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;
    private final RoomRepository roomRepository;
    private final CustomRoomRepository customRoomRepository;

    private final String BACKGROUND = "WHITE,BLACK";

    @Transactional
    public void createRoom(ReqPostRoom reqPostRoom, Long id) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));

        Room room = Room.builder()
                .name(reqPostRoom.getName())
                .user(user)
                .background(BACKGROUND)
                .emotionTag("")
                .build();

        roomRepository.save(room);
        
        //TODO: 기본 가구 배치
    }

    @Transactional
    public void updateRoom(ReqPatchRoom reqPatchRoom, Long id, Long roomId) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        Room room = roomRepository.findByIdAndUser(roomId, user)
                .orElseThrow(() -> new NullPointerException("Room을 찾을 수 없습니다."));

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
        
        //TODO: Background 처리
    }

    public ResGetRoomList readRoomList(ReqGetRoomList reqGetRoomList, Long id) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        UserDetail userDetail = userDetailRepository.findByUser(user)
                .orElseThrow(() -> new NullPointerException("User 정보가 손상되었습니다."));

        ResGetRoomList.ResGetRoomListBuilder resGetRoomListBuilder = ResGetRoomList.builder();
        resGetRoomListBuilder.mainRoomId(
                userDetail.getMainRoom().getId()
        );

        List<ResGetRoom> roomList = customRoomRepository.readRoomList(user, reqGetRoomList.getTags());
        resGetRoomListBuilder.roomList(roomList);
        return resGetRoomListBuilder.build();
    }
}
