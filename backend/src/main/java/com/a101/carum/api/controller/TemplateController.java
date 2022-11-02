package com.a101.carum.api.controller;

import com.a101.carum.service.JwtService;
import com.a101.carum.service.TemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("template")
@RequiredArgsConstructor
public class TemplateController {
    private final JwtService jwtService;
    private final TemplateService templateService;
}
