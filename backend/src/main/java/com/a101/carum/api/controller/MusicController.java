package com.a101.carum.api.controller;

import com.a101.carum.api.dto.ReqGetMusicList;
import com.a101.carum.service.MusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("music")
public class MusicController {

    @Value("${music.upload.dir}")
    private String BASE_PATH;

    @Value("${music.upload.url}")
    private String BASE_URL;
    private final MusicService musicService;

    @GetMapping()
    public ResponseEntity readMusicList(@ModelAttribute ReqGetMusicList reqGetMusicList, Pageable pageable) {
        return ResponseEntity.ok(musicService.readMusicList(reqGetMusicList, pageable));
    }

    @GetMapping("file/{musicId}")
    public StreamingResponseBody readMusic(@PathVariable Long musicId) {
        String resource = musicService.readResource(musicId);
        StringBuilder pathSb = new StringBuilder();
        String filePath = pathSb.append(BASE_PATH).append(resource).toString();

        try {
            File file = new File(filePath);
            final InputStream is = new FileInputStream(file);
            return os -> {
                readAndWrite(is, os);
            };
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
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
