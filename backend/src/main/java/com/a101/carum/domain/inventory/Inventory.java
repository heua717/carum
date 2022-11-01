package com.a101.carum.domain.inventory;

import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.user.User;
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
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "user_id", "furniture_id" }) })
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne(targetEntity = Furniture.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "furniture_id", referencedColumnName = "id")
    private Furniture furniture;

    @Builder
    public Inventory(User user, Furniture furniture){
        this.user = user;
        this.furniture = furniture;
    }
}