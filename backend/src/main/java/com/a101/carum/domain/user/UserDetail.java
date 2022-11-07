package com.a101.carum.domain.user;

import com.a101.carum.domain.pet.PetType;
import com.a101.carum.domain.question.FaceType;
import com.a101.carum.domain.room.Room;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Getter
@Table(uniqueConstraints = {@UniqueConstraint(name = "main_room_constraint", columnNames = {"main_room", "user_id"})})
public class UserDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @Column(name = "money")
    private Long money = 0L;

    @Column(name = "pet_type")
    @Enumerated(EnumType.STRING)
    private PetType petType;

    @Column(name = "daily_face")
    @Enumerated(EnumType.STRING)
    private FaceType dailyFace;

    @Column(name = "daily_color")
    private Integer dailyColor;

    @Column(name = "last_diary")
    private LocalDate lastDiary;

    @OneToOne(targetEntity = Room.class, fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "main_room", referencedColumnName = "id")
    private Room mainRoom;

    @OneToOne(targetEntity = User.class, fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Builder
    public UserDetail(User user, Room room) {
        this.user = user;
        this.mainRoom = room;
    }

    public void updateMoney(Long money, char type){
        switch (type) {
            case '+':
                this.money += money;
                break;
            case '-':
                this.money -= money;
                break;
        }
    }

    public void updateDaily(FaceType dailyFace, Integer dailyColor, LocalDate lastDiary) {
        this.dailyFace = dailyFace;
        this.dailyColor = dailyColor;
        this.lastDiary = lastDiary;
    }

    public void updateMainRoom(Room room) {
        this.mainRoom = room;
    }

    public void updatePetType(PetType petType) {
        this.petType = petType;
    }
}
