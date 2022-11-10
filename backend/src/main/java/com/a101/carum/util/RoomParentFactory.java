package com.a101.carum.util;

import com.a101.carum.api.dto.ReqPostRoom;
import com.a101.carum.domain.room.Room;
import com.a101.carum.domain.room.RoomParent;
import com.a101.carum.domain.room.RoomTemplate;
import com.a101.carum.domain.user.User;
import com.a101.carum.repository.RoomParentRepository;
import com.a101.carum.repository.RoomRepository;
import com.a101.carum.repository.RoomTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RoomParentFactory {
    private final RoomParentRepository roomParentRepository;
    private final RoomRepository roomRepository;
    private final RoomTemplateRepository roomTemplateRepository;

    public RoomParent createRoomParent(User user, String name, Integer background, Integer frame, String emotionTag) {
        if(user == null) {
            return RoomTemplate.builder()
                    .name(name)
                    .frame(frame)
                    .background(background)
                    .emotionTag(emotionTag)
                    .build();
        }

        return Room.builder()
                .user(user)
                .name(name)
                .frame(frame)
                .background(background)
                .emotionTag(emotionTag)
                .build();
    }
}
