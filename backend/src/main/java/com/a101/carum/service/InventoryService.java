package com.a101.carum.service;

import com.a101.carum.api.dto.ResGetFurniture;
import com.a101.carum.api.dto.ResGetFurnitureList;
import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.inventory.Inventory;
import com.a101.carum.domain.user.User;
import com.a101.carum.domain.user.UserDetail;
import com.a101.carum.repository.InventoryRepository;
import com.a101.carum.repository.UserDetailRepository;
import com.a101.carum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;

    @Transactional
    public ResGetFurnitureList readInventory(Long id) {
        User user = userRepository.findByIdAndIsDeleted(id,false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        UserDetail userDetail = userDetailRepository.findByUser(user)
                .orElseThrow(() -> new NullPointerException("User 정보가 손상되었습니다."));
        List<Inventory> inventoryList = inventoryRepository.findByUser(user);

        List<ResGetFurniture> furnitureList = new ArrayList<>();
        for(Inventory inventory: inventoryList){
            Furniture furniture = inventory.getFurniture();
            furnitureList.add(ResGetFurniture.builder()
                            .id(furniture.getId())
                            .name(furniture.getName())
                            .price(furniture.getPrice())
                            .resource(furniture.getResource())
                            .type(furniture.getType())
                            .have(true)
                            .build());
        }
        return ResGetFurnitureList.builder()
                .furnitureList(furnitureList)
                .money(userDetail.getMoney())
                .build();
    }
}
