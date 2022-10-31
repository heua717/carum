package com.a101.carum.api.controller;

import com.a101.carum.api.dto.ReqGetRoomList;
import com.a101.carum.api.dto.ReqPatchRoom;
import com.a101.carum.api.dto.ReqPostRoom;
import com.a101.carum.service.JwtService;
import com.a101.carum.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("room")
@RequiredArgsConstructor
public class RoomController {

    private final JwtService jwtService;
    private final RoomService roomService;

    @PostMapping()
    public ResponseEntity createRoom(@RequestBody ReqPostRoom reqPostRoom, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        roomService.createRoom(reqPostRoom, id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("{roomId}")
    public ResponseEntity updateRoom(@PathVariable Long roomId, @RequestBody ReqPatchRoom reqPatchRoom, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        roomService.updateRoom(reqPatchRoom, id, roomId);
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public ResponseEntity readRoom(@ModelAttribute ReqGetRoomList reqGetRoomList, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        return ResponseEntity.ok(roomService.readRoomList(reqGetRoomList, id));
    }
}
