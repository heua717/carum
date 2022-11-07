package com.a101.carum.api.controller;

import com.a101.carum.api.dto.ReqGetPet;
import com.a101.carum.api.dto.ReqGetPetList;
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

    /*
    펫 설정 -> 달마다 pet type이 null로 돌아가는데 해당 값을 설정하는 것
    PET은 달마다 저장하는 거라서 create pet해서 매번 만들어주는 건 적합하지 못하다고 판단함
     */
    @PutMapping("")
    public ResponseEntity updatePet(@RequestBody ReqPostPet reqPostPet, HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);
        petService.updatePet(reqPostPet,userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("face")
    public ResponseEntity getPetDaily(HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);
        return ResponseEntity.ok().body(petService.getPetDaily(userId));
    }

    @GetMapping("{petId}")
    public ResponseEntity getPet(@PathVariable Long petId, HttpServletRequest request) {
        Long userId = jwtService.getUserId(request);
        return ResponseEntity.ok().body(petService.getPet(userId, petId));
    }

    @GetMapping("")
    public ResponseEntity getPetList(@ModelAttribute ReqGetPet reqGetPet, HttpServletRequest request){
        Long userId = jwtService.getUserId(request);
        if (reqGetPet.getMonth() == null){
            return ResponseEntity.ok().body(petService.getPet(reqGetPet.getYear(), userId));
        } else {
            return ResponseEntity.ok().body(petService.getPet(reqGetPet.getYear(), reqGetPet.getMonth(), userId));
        }
    }
}
