package com.a101.carum.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TemplateConversionService {

    @Value("${room.template.base}")
    private Long TEMPLATE_BASE;

    private List<Long> TEMPLATE_LIST;

    @Value("${room.template.list}")
    public void setTEMPLATE_LIST(String listString){
        String[] list = listString.split(",");
        this.TEMPLATE_LIST = new ArrayList<>();

        for(String id: list){
            this.TEMPLATE_LIST.add(Long.parseLong(id));
        }
    }


}
