package com.a101.carum.api.controller;

import com.a101.carum.api.dto.ReqPostImage;
import com.a101.carum.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("image")
public class ImageController {

    @Value("${file.upload.dir}")
    private String BASE_PATH;

    @Value("${file.upload.url}")
    private String BASE_URL;

    private final StringUtils stringUtils;

    @PostMapping()
    public ResponseEntity saveImage(@ModelAttribute ReqPostImage reqPostImage) throws IOException {

        MultipartFile image = reqPostImage.getImage();

        if (image == null || image.isEmpty()) {
            throw new FileUploadException("업로드하려는 파일이 없습니다.");
        }

        String contentType = image.getContentType();
        if (ObjectUtils.isEmpty(contentType)) {
            throw new FileUploadException("확장자 명이 없습니다.");
        }

        if (contentType.contains("image/jpeg")){
            contentType = "jpg";
        } else if (contentType.contains("image/png")) {
            contentType = "png";
        } else if (contentType.contains("image/gif")) {
            contentType = "gif";
        } else {
            throw new FileUploadException("이미지 파일 확장자가 아닙니다.");
        }

        String name = reqPostImage.getName();
        if(name == null){
            name = stringUtils.getRandomString(10);
        }

        StringBuilder nameSb = new StringBuilder();
        String fileName = nameSb.append(name)
                .append(".")
                .append(contentType)
                .toString();

        StringBuilder pathSb = new StringBuilder();
        String filePath = pathSb.append(BASE_PATH).append(fileName).toString();

        StringBuilder urlSb = new StringBuilder();
        String fileUrl = urlSb.append(BASE_URL).append(fileName).toString();

        image.transferTo(new File(filePath));

        Map<String, String> resultMap = new HashMap<>();
        resultMap.put("fileUrl", fileUrl);

        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("{fileName}")
    public StreamingResponseBody readImage(@PathVariable String fileName) throws FileNotFoundException {
        StringBuilder pathSb = new StringBuilder();
        String filePath = pathSb.append(BASE_PATH).append(fileName).toString();
        File file;
        try {
            file = new File(filePath);
            if (!file.exists()) throw new FileNotFoundException("파일을 찾을 수 없습니다.");
        } catch (Exception e) {
            throw new FileNotFoundException("파일을 찾을 수 없습니다.");
        }

        final InputStream is = new FileInputStream(file);
        return os -> {
            readAndWrite(is, os);
        };
    }

    private void readAndWrite(final InputStream is, OutputStream os) throws IOException {
        byte[] data = new byte[2048];
        int read = 0;
        while ((read = is.read(data)) > 0) {
            os.write(data, 0, read);
        }
        os.flush();
    }

}
