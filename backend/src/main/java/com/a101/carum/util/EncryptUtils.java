package com.a101.carum.util;


import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Component
public class EncryptUtils {

    /**
     * 스트링을 sha256 방식으로 암호화
     *
     * @param text 암호화할 스트링
     * @return 암호화된 스트링
     * @throws NoSuchAlgorithmException 해당 암호화 알고리즘이 존재하지 않는 경우
     */
    public String encrypt(String text) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(text.getBytes());

        return bytesToHex(md.digest());
    }

    /**
     * userId에서 salt 생성
     *
     * @param userId
     * @return salt
     */
    public String getSalt(String userId) {
        StringBuilder sb = new StringBuilder();

        sb.append(userId.charAt(0));
        sb.append(userId.charAt(userId.length() - 1));

        return sb.toString();
    }

    /**
     *
     * @param bytes
     * @return
     */
    private String bytesToHex(byte[] bytes) {
        StringBuilder builder = new StringBuilder();
        for (byte b : bytes) {
            builder.append(String.format("%02x", b));
        }
        return builder.toString();
    }

}
