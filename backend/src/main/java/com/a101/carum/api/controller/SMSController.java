package com.a101.carum.api.controller;

import com.a101.carum.api.dto.ReqPostSMSDto;
import com.a101.carum.api.dto.ResPostSMSDto;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sms")
@RequiredArgsConstructor
public class SMSController {
    private final DefaultMessageService messageService;

    public SMSController(){
        this.messageService= NurigoApp.INSTANCE.initialize("NCSQK3QR94HHZNTO","VZV7ESKWC1LV7KXUDIYOOXFXLCJFSE9L","https://api.coolsms.co.kr");
    }
    @PostMapping()
    public ResponseEntity sendOne(@RequestBody ReqPostSMSDto requestDto) {
        Message message = new Message();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01087562387");
        message.setTo(requestDto.getPhoneNo());
        Integer randCode = (int)(Math.random()*1000000);
        message.setText("SSAFY 7기 자율 프로젝트 A101 인증코드 [" + randCode+"]");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));

        return ResponseEntity.ok().body(new ResPostSMSDto(randCode.toString()));
    }
}
