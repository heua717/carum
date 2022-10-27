package com.a101.carum.api.controller;

import com.a101.carum.api.dto.*;
import com.a101.carum.service.ShopService;
import com.a101.carum.service.TestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("shop")
public class ShopController {
   private final ShopService shopService;

   @GetMapping()
   public ResponseEntity readFurnitureList(@ModelAttribute ReqGetFurnitureList reqGetFurnitureList, Pageable pageable){
      return ResponseEntity.ok(shopService.readFurnitureList(reqGetFurnitureList, pageable));
   }
}
