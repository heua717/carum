package com.a101.carum.service;

import com.a101.carum.api.dto.ReqGetFurnitureList;
import com.a101.carum.api.dto.ReqPostInventory;
import com.a101.carum.api.dto.ResGetFurnitureList;
import com.a101.carum.common.exception.LessMoneyException;
import com.a101.carum.domain.furniture.Furniture;
import com.a101.carum.domain.inventory.Inventory;
import com.a101.carum.domain.user.User;
import com.a101.carum.domain.user.UserDetail;
import com.a101.carum.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ShopService {

    private final FurnitureRepository furnitureRepository;
    private final CustomFurnitureRepository customFurnitureRepository;
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;
    private final InventoryRepository inventoryRepository;

    @Transactional
    public ResGetFurnitureList readFurnitureList(ReqGetFurnitureList reqGetFurnitureList, Pageable pageable, Long id) {
        User user = userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        UserDetail userDetail = userDetailRepository.findByUser(user)
                .orElseThrow(() -> new NullPointerException("User 정보가 손상되었습니다."));
        return customFurnitureRepository.readFurnitureList(reqGetFurnitureList, pageable, user, userDetail);
    }

    @Transactional
    public void postInventory(ReqPostInventory reqPostInventory, Long id) {
        User user = userRepository.findByIdAndIsDeleted(id,false)
                .orElseThrow(() -> new NullPointerException("User를 찾을 수 없습니다."));
        UserDetail userDetail = userDetailRepository.findByUser(user)
                .orElseThrow(() -> new NullPointerException("User 정보가 손상되었습니다."));
        Furniture furniture = furnitureRepository.findById(reqPostInventory.getFurnitureId())
                .orElseThrow(() -> new NullPointerException("가구를 찾을 수 없습니다."));

        if(userDetail.getMoney() < furniture.getPrice()) {
            throw new LessMoneyException("가구를 살 돈이 없습니다.");
        }

        Inventory inventory = Inventory.builder()
                .furniture(furniture)
                .user(user)
                .build();

        inventoryRepository.save(inventory);

        userDetail.updateMoney(furniture.getPrice(), '-');
    }
}
