package com.a101.carum.domain.interior;

import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.room.Room;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Getter
@ToString
public class Interior {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @ManyToOne(targetEntity = Room.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;

    @ManyToOne(targetEntity = Furniture.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "furniture_id", referencedColumnName = "id")
    private Furniture furniture;

    @Column(name = "x", nullable = false)
    private Float x;

    @Column(name = "y", nullable = false)
    private Float y;

    @Column(name = "z", nullable = false)
    private Float z;

    @Column(name = "x_rot", nullable = false)
    private Float xRot;

    @Column(name = "y_rot", nullable = false)
    private Float yRot;

    @Column(name = "z_rot", nullable = false)
    private Float zRot;

    @Builder
    public Interior(Room room, Furniture furniture, Float x, Float y, Float z, Float xRot, Float yRot, Float zRot){
        this.room = room;
        this.furniture = furniture;
        this.x = x;
        this.y = y;
        this.z = z;
        this.xRot = xRot;
        this.yRot = yRot;
        this.zRot = zRot;
    }

    public void updatePlace(Float x, Float y, Float z, Float xRot, Float yRot, Float  zRot){
        this.x = x;
        this.y = y;
        this.z = z;
        this.xRot = xRot;
        this.yRot = yRot;
        this.zRot = zRot;
    }
}
