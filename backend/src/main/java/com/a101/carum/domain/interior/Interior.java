package com.a101.carum.domain.interior;

import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.room.Room;
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
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "room_id", "furniture_id" }) })
public class Interior {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @ManyToOne(targetEntity = Room.class, fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;

    @ManyToOne(targetEntity = Furniture.class, fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "furniture_id", referencedColumnName = "id")
    private Furniture furniture;

    @Column(name = "x", nullable = false)
    private double x;

    @Column(name = "y", nullable = false)
    private double y;

    @Column(name = "z", nullable = false)
    private double z;

    @Column(name = "x_rot", nullable = false)
    private double xRot;

    @Column(name = "y_rot", nullable = false)
    private double yRot;

    @Column(name = "z_rot", nullable = false)
    private double zRot;
}
