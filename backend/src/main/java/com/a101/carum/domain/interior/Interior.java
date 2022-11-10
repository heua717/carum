package com.a101.carum.domain.interior;

import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.room.Room;
import com.a101.carum.domain.room.RoomParent;
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

    @ManyToOne(targetEntity = RoomParent.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private RoomParent room;

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
    private Float rotX;

    @Column(name = "y_rot", nullable = false)
    private Float rotY;

    @Column(name = "z_rot", nullable = false)
    private Float rotZ;

    @Builder
    public Interior(RoomParent room, Furniture furniture, Float x, Float y, Float z, Float rotX, Float rotY, Float rotZ){
        this.room = room;
        this.furniture = furniture;
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotX = rotX;
        this.rotY = rotY;
        this.rotZ = rotZ;
    }

    public void updatePlace(Float x, Float y, Float z, Float rotX, Float rotY, Float  rotZ){
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotX = rotX;
        this.rotY = rotY;
        this.rotZ = rotZ;
    }
}
