package com.a101.carum.api.dto;

import com.a101.carum.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@Builder
public class ResGetDiary {
    private Long id;
    private User user;
    private String content;
    private LocalDateTime createDate;
    private String background;
    private List<String> emotionTag;

}
