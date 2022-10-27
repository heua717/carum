package com.a101.carum.api.controller;

import com.a101.carum.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("inventory")
public class InventoryController {

    private final InventoryService inventoryService;

}
