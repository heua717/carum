package com.a101.carum.domain.redistest;

import com.a101.carum.domain.test.TestType;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;
import java.time.LocalDate;

@Getter
@RedisHash(value = "test")
public class RedisTest {
    @Id
    private Long id;
    private String string;
    private LocalDate date;
    private TestType type;

    @Builder
    public RedisTest(Long id, String string, LocalDate date, TestType type){
        this.id = id;
        this.string = string;
        this.date = date;
        this.type = type;
    }
}
