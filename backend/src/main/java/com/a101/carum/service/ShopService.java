package com.a101.carum.service;

import com.a101.carum.api.dto.ReqGetFurnitureList;
import com.a101.carum.api.dto.ResGetFurnitureList;
import com.a101.carum.repository.CustomFurnitureRepository;
import com.a101.carum.repository.FurnitureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShopService {

    private final FurnitureRepository furnitureRepository;
    private final CustomFurnitureRepository customFurnitureRepository;

    public ResGetFurnitureList readFurnitureList(ReqGetFurnitureList reqGetFurnitureList, Pageable pageable) {
        return customFurnitureRepository.readFurnitureList(reqGetFurnitureList, pageable);
    }
}
