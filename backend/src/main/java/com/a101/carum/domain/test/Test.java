package com.a101.carum.domain.test;

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
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    @Column(name = "string", nullable = false)
    private String string;

    @Column(name = "date", unique = true)
    private LocalDate date;

    @Column(name = "type", length = 10)
    @Enumerated(EnumType.STRING)
    private TestType type;

    @Builder
    public Test(String string, LocalDate date, TestType type){
        this.string = string;
        this.date = date;
        this.type = type;
    }

    public void updateString(String string){
        this.string = string;
    }

    public void updateType(TestType type) {
        this.type = type;
    }
}
