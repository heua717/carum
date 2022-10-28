package com.a101.carum.domain.funiture;

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
public class Furniture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "resource", nullable = false, unique = true)
    private String resource;

    @Column(name = "price", nullable = false)
    private Integer price = 0;

    @Column(name = "type", length = 20)
    @Enumerated(EnumType.STRING)
    private FurnitureType type;
}
