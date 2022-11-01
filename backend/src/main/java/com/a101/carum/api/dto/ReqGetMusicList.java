package com.a101.carum.api.dto;

import com.a101.carum.domain.furniture.FurnitureType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReqGetMusicList {
    List<String> tags;
}
