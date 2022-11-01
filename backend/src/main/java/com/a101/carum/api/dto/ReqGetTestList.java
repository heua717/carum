package com.a101.carum.api.dto;

import com.a101.carum.domain.test.TestType;
import lombok.*;

@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqGetTestList {
    String string;
    TestType type;
}
