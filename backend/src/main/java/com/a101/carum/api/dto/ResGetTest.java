package com.a101.carum.api.dto;

import com.a101.carum.domain.test.TestType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResGetTest {
    Long id;
    String string;
    LocalDate date;
    TestType type;
}
