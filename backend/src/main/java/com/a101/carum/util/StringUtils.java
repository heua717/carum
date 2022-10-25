package com.a101.carum.util;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class StringUtils {
    /**
     * length만큼 길의의 랜덤 스트링 생성
     *
     * @param length 생성할 스트링의 길이
     * @return 생성된 스트링
     */
    public String getRandomString(int length) {
        StringBuilder sb = new StringBuilder();
        Random rnd = new Random();
        for (int i = 0; i < length; i++) {
            int rIndex = rnd.nextInt(3);
            switch (rIndex) {
                case 0:
                    // a-z
                    sb.append((char) ((int) (rnd.nextInt(26)) + 97));
                    break;
                case 1:
                    // A-Z
                    sb.append((char) ((int) (rnd.nextInt(26)) + 65));
                    break;
                case 2:
                    // 0-9
                    sb.append((rnd.nextInt(10)));
                    break;
            }
        }
        return sb.toString();
    }


}
