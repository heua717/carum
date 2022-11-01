package com.a101.carum.api.controller;

import com.a101.carum.api.dto.*;
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

    @PutMapping("{roomId}")
    public ResponseEntity updateInterior(@PathVariable Long roomId, @RequestBody ReqPutRoom reqPutRoom, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        roomService.updateInterior(reqPutRoom, id, roomId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{roomId}")
    public ResponseEntity readInterior(@PathVariable Long roomId, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        return ResponseEntity.ok(roomService.readInterior(id, roomId));
    }

    @DeleteMapping("{roomId}")
    public ResponseEntity deleteInterior(@PathVariable Long roomId, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        roomService.deleteInterior(id, roomId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{roomId}/playlist")
    public ResponseEntity updatePlaylist(@PathVariable Long roomId, @RequestBody ReqPutPlaylist reqPutPlaylist, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        roomService.updatePlaylist(reqPutPlaylist, id, roomId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{roomId}/playlist")
    public ResponseEntity readPlaylist(@PathVariable Long roomId, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        return ResponseEntity.ok(roomService.readPlaylist(id, roomId));
    }
}
