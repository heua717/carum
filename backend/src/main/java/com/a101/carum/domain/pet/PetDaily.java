package com.a101.carum.domain.pet;

import com.a101.carum.domain.question.FaceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "pet_daily")
public class PetDaily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "pet_type")
    @Enumerated(EnumType.STRING)
    private PetType petType;

    @Column(name = "emotion_tag")
    private String emotionTag;

    @Column(name = "color")
    private String color;

    @Column(name = "face")
    @Enumerated(EnumType.STRING)
    private FaceType face;

    public Integer Color(String color) {
        String[] list = color.split(",");
        if(list.length==1) {
            return Integer.parseInt(list[0]);
        } else {
            return Integer.parseInt(list[(int)(Math.random()*10000)%4]);
        }
    }


}
