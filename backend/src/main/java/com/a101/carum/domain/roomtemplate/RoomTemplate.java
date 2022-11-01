package com.a101.carum.domain.roomtemplate;

import com.a101.carum.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class RoomTemplate {
    private User user;
    private String name, background, emotionTag;
}
