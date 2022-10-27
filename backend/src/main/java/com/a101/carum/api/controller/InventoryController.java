package com.a101.carum.api.controller;

import com.a101.carum.service.InventoryService;
import com.a101.carum.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("inventory")
public class InventoryController {

    private final InventoryService inventoryService;
    private final JwtService jwtService;

    @GetMapping()
    public ResponseEntity readInventory(HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        return ResponseEntity.ok(inventoryService.readInventory(id));
    }
}
