package com.a101.carum.domain.room;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Getter
public class RoomTemplate extends RoomParent{
    @Builder
    public RoomTemplate(String name, Integer background, Integer frame, String emotionTag){
        super(name, background, frame, emotionTag);
    }

}
