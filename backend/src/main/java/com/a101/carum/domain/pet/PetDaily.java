package com.a101.carum.domain.pet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@Builder
@Table(name = "pet_daily")
@NoArgsConstructor
public class PetDaily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long dailyPetId;

    @Column(name = "pet_type")
    @Enumerated(EnumType.STRING)
    private PetType petType;

    @Column(name = "emotion")
    private String emotion;

    @Column(name = "colors")
    private String colors;
}
