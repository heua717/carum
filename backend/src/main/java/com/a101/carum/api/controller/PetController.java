package com.a101.carum.api.controller;

import com.a101.carum.api.dto.ReqGetPet;
import com.a101.carum.api.dto.ReqPostPet;
import com.a101.carum.service.JwtService;
import com.a101.carum.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("pet")
public class PetController {
    private final JwtService jwtService;
    private final PetService petService;

    @PostMapping("")
    public ResponseEntity createPet(@RequestBody ReqPostPet reqPostPet, HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);
        petService.createPet(reqPostPet,userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/face")
    public ResponseEntity getPetDaily(HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);

        return ResponseEntity.ok().body(petService.getPetDaily(userId));
    }

}
