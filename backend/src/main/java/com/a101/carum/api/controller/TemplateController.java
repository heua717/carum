package com.a101.carum.api.controller;

import com.a101.carum.api.dto.*;
import com.a101.carum.service.JwtService;
import com.a101.carum.service.TemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("template")
@RequiredArgsConstructor
public class TemplateController {
    private final JwtService jwtService;
    private final TemplateService templateService;

    @PostMapping()
    public ResponseEntity createTemplate(@RequestBody ReqPostRoom reqPostRoom, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        templateService.createTemplate(reqPostRoom, id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("{templateId}")
    public ResponseEntity updateTemplate(@PathVariable Long templateId, @RequestBody ReqPatchRoom reqPatchRoom, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        templateService.updateTemplate(reqPatchRoom, id, templateId);
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public ResponseEntity readTemplate(HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        return ResponseEntity.ok(templateService.readTemplateList(id));
    }

    @PutMapping("{templateId}")
    public ResponseEntity updateInterior(@PathVariable Long templateId, @RequestBody ReqPutRoom reqPutRoom, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        templateService.updateInterior(reqPutRoom, id, templateId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{templateId}")
    public ResponseEntity readInterior(@PathVariable Long templateId, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        return ResponseEntity.ok(templateService.readInterior(id, templateId));
    }

    @DeleteMapping("{templateId}")
    public ResponseEntity deleteInterior(@PathVariable Long templateId, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        templateService.deleteInterior(id, templateId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{templateId}/playlist")
    public ResponseEntity updatePlaylist(@PathVariable Long templateId, @RequestBody ReqPutPlaylist reqPutPlaylist, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        templateService.updatePlaylist(reqPutPlaylist, id, templateId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{templateId}/playlist")
    public ResponseEntity readPlaylist(@PathVariable Long templateId, HttpServletRequest request){
        Long id = jwtService.getUserId(request);
        return ResponseEntity.ok(templateService.readPlaylist(id, templateId));
    }
}
